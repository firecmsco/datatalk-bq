import {
    ChatMessage,
    ChatSessionItem,
    DataRow,
    DataSource,
    DateParams,
    DryWidgetConfig,
    FilterOp,
    FunctionCall,
    GCPProject,
    WidgetConfig
} from "./types";
import { LLMOutputParser } from "./utils/llm_parser";
import JSON5 from "json5";

interface StreamDatakiCommandParams {
    firebaseAccessToken: string;
    command: string;
    apiEndpoint: string;
    sessionId: string;
    projectId: string;
    initialWidgetConfig?: DryWidgetConfig;
    sources: DataSource[];
    messages: ChatMessage[];
    onDelta: (delta: string) => void;
    onFunctionCall: (call: FunctionCall) => void;
}

export class ApiError extends Error {

    public code?: string;

    constructor(message: string, code?: string) {
        super(message);
        this.code = code;
    }
}

export async function streamDatakiCommand({
                                              firebaseAccessToken,
                                              command,
                                              apiEndpoint,
                                              sessionId,
                                              projectId,
                                              initialWidgetConfig,
                                              sources,
                                              messages,
                                              onDelta,
                                              onFunctionCall
                                          }: StreamDatakiCommandParams
): Promise<string> {

    const parser = new LLMOutputParser((v) => console.log("Delta:", v));

    // eslint-disable-next-line no-async-promise-executor
    return new Promise<string>(async (resolve, reject) => {
        try {
            const history = messages;
            const response = await fetch(apiEndpoint + "/dataki/command", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${firebaseAccessToken}`
                },
                body: JSON.stringify({
                    sessionId,
                    command,
                    projectId,
                    sources,
                    history,
                    initialWidgetConfig
                })
            });

            if (!response.ok) {
                const data = await response.json();
                console.error("Error streaming data talk command", data);
                reject(new ApiError(data.message, data.code));
                return;
            }

            if (response.body) {
                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                let buffer = "";
                const result: ChatSessionItem[] = [];
                const processChunk = (chunk: ReadableStreamReadResult<Uint8Array>): void | Promise<void> => {
                    if (chunk.done) {
                        console.log("Stream completed", { result });
                        return;
                    }

                    // Decoding chunk value to text
                    const text = decoder.decode(chunk.value, { stream: true });
                    buffer += text;

                    // Split based on our special prefix and filter out empty strings
                    const parts = buffer.split("&$# ").filter(part => part.length > 0);

                    // // console.log("Message received:", text, parts);
                    // // Check if the last part is incomplete (no trailing prefix for next message)
                    // if (!text.endsWith("&$# ")) {
                    //     buffer = parts.pop() || ""; // Save incomplete part back to buffer, or empty it if there's none
                    // } else {
                    buffer = ""; // Reset buffer as all parts are complete
                    // }

                    // Process complete messages
                    parts.forEach(part => {
                        try {
                            const message = JSON5.parse(part);
                            if (message.type === "delta") {
                                result.push(message.data.delta);
                                onDelta(message.data.delta);
                                parser.parseDelta(message.data.delta);
                            } else if (message.type === "function_call") {
                                onFunctionCall(message.data.call);
                            } else if (message.type === "result") {
                                console.log("Result received:", parser.getFinalState());
                                resolve(message.data);
                            }
                        } catch (error) {
                            console.error("Error parsing message part:", part, error);
                        }
                    });

                    // Read the next chunk
                    reader.read().then(processChunk);
                };

                // Start reading the stream
                reader.read().then(processChunk);
            }
        } catch (error) {
            console.error("Error streaming data talk command", error);
            reject(error);
        }
    });
}

export function hydrateChartConfig(firebaseAccessToken: string,
                                   apiEndpoint: string,
                                   config: DryWidgetConfig,
                                   params?: DateParams
): Promise<WidgetConfig> {
    return fetch(apiEndpoint + "/dataki/hydrate_chart" + (config.id ? "?id=" + config.id : ""), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${firebaseAccessToken}`
        },
        body: JSON.stringify({
            config,
            params
        })
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => {
                    throw new ApiError(data.message, data.code);
                });
            }
            return response.json();
        })
        .then(data => data.data);
}

export interface SQLQueryRequest {
    firebaseAccessToken: string;
    apiEndpoint: string;
    sql: string;
    dataSources: DataSource[];
    orderBy?: [string, "asc" | "desc"][],
    filter?: [string, FilterOp, unknown] []
    params?: DateParams;
    limit?: number;
    offset?: number;
}

export function makeSQLQuery({
                                 firebaseAccessToken,
                                 apiEndpoint,
                                 sql,
                                 dataSources,
                                 orderBy,
                                 filter,
                                 params,
                                 limit,
                                 offset
                             }: SQLQueryRequest
): Promise<DataRow[]> {
    return fetch(apiEndpoint + "/data/query", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${firebaseAccessToken}`
        },
        body: JSON.stringify({
            sql,
            dataSources,
            params,
            orderBy,
            filter,
            limit,
            offset
        })
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => {
                    throw new ApiError(data.message, data.code);
                });
            }
            return response.json();
        })
        .then(data => data.data);
}

export function getDatakiPromptSuggestions(firebaseAccessToken: string,
                                           apiEndpoint: string,
                                           dataSources: DataSource[],
                                           messages?: ChatMessage[],
                                           initialWidgetConfig?: DryWidgetConfig
): Promise<string[]> {
    const history = (messages ?? []).filter(message => message.user === "USER" || message.user === "SYSTEM");
    return fetch(apiEndpoint + "/dataki/prompt_suggestions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${firebaseAccessToken}`
        },
        body: JSON.stringify({
            dataSources,
            history,
            initialWidgetConfig
        })
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => {
                    throw new ApiError(data.message, data.code);
                });
            }
            return response.json();
        })
        .then(data => data.data);
}

export function fetchDataSourcesForProject(firebaseAccessToken: string, apiEndpoint: string, projectId: string): Promise<DataSource[]> {
    return fetch(apiEndpoint + "/projects/" + projectId + "/datasets",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${firebaseAccessToken}`
            }
        }).then(response => {
        if (!response.ok) {
            return response.json().then(data => {

                console.log("!!! Error fetching GCP projects", data);
                throw new ApiError(data.message, data.code);
            });
        }
        return response.json();
    })
        .then(data => data.data);

}

export function createServiceAccountLink(firebaseAccessToken: string, apiEndpoint: string, projectId: string): Promise<boolean> {
    return fetch(apiEndpoint + "/projects/" + projectId + "/service_accounts",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${firebaseAccessToken}`
            }
        }).then(response => {
        if (!response.ok) {
            return response.json().then(data => {
                throw new ApiError(data.message, data.code);
            });
        }
        return response.json();
    })
        .then(data => data.data);

}

export function deleteServiceAccountLink(firebaseAccessToken: string, apiEndpoint: string, projectId: string): Promise<boolean> {
    return fetch(apiEndpoint + "/projects/" + projectId + "/service_accounts",
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${firebaseAccessToken}`
            }
        }).then(response => {
        if (!response.ok) {
            return response.json().then(data => {
                throw new ApiError(data.message, data.code);
            });
        }
        return response.json();
    })
        .then(data => data.data);

}

export function fetchGCPProjects(firebaseAccessToken: string, apiEndpoint: string): Promise<GCPProject[]> {
    return fetch(apiEndpoint + "/projects",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${firebaseAccessToken}`
            }
        }).then(response => {
        if (!response.ok) {
            return response.json().then(data => {
                console.log("!!! Error fetching GCP projects", data);
                throw new ApiError(data.message, data.code);
            });
        }
        return response.json();
    })
        .then(data => data.data);
}

/**
 * Generate the authorization URL for the OAuth2 flow
 *
 */
export async function generateAuthUrl(redirectUri: string, includeGCPScope: boolean, apiEndpoint: string) {
    const url = new URL(`${apiEndpoint}/oauth/generate_auth_url`);
    url.searchParams.append("redirect_uri", redirectUri);
    if (includeGCPScope)
        url.searchParams.append("include_gcp_scope", "true");

    const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }

    return response.json();
}

/**
 * Exchange the authorization code for an access token
 *
 */
export async function exchangeCodeForToken(redirectUri: string, code: string, apiEndpoint: string): Promise<Record<string, string>> {
    const url = new URL(`${apiEndpoint}/oauth/exchange_code_for_token`);
    url.searchParams.append("redirect_uri", redirectUri);
    url.searchParams.append("code", code);

    const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }

    const json = await response.json();
    return json.data;
}

/**
 * Refresh the access token
 *
 */
export async function postUserCredentials(credentials: object, firebaseAccessToken: string, apiEndpoint: string) {
    const url = `${apiEndpoint}/oauth/credentials`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${firebaseAccessToken}`
        },
        body: JSON.stringify(credentials)
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }

    return response.json();
}

export function checkUserHasGCPPermissions(uid: string, apiEndpoint: string): Promise<boolean> {
    const url = new URL(`${apiEndpoint}/users/${uid}/has_gcp_scopes`);

    return fetch(url.toString(), {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => {
                    throw new ApiError(data.error, data.code);
                });
            }
            return response.json();
        })
        .then(data => data.data);
}
