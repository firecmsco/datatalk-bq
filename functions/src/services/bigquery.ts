import { BigQuery, BigQueryDate, BigQueryDatetime, BigQueryInt, BigQueryTimestamp } from "@google-cloud/bigquery";
// @ts-ignore
import { Big } from "big.js";
import { ServiceAccountKey } from "../types/service_account";
import { DashboardParams, DataSource } from "../types/dashboards";
import DataTalkException from "../types/exceptions";
import * as util from "util";

export async function runSQLQuery(sql: string, credentials?: ServiceAccountKey, params?: DashboardParams) {

    try {
        const bigquery = new BigQuery({
            projectId: credentials?.project_id,
            credentials
        });

        // console.log("bigquery", util.inspect(bigquery, false, null, true));
        // console.log(bigquery.authClient);
        // console.log(bigquery.makeAuthenticatedRequest.getCredentials((err, cred) => {
        //     console.log("INNER: getCredentials", {
        //         err,
        //         cred
        //     });
        // }));
        console.log("projectId", await bigquery.getProjectId());

        const cleanSQL = sql
            .replaceAll("\\n", " ")
            .replaceAll("\\\\n", " ")
            .replaceAll("\n", " ")
            .replaceAll("\\'", "'")
            .replace(/\n/g, "")
            .replace(/\\\\/g, "");

        const usedParams = convertParams(params);
        console.log("Running clean query:", cleanSQL, usedParams);
        const query = {
            query: cleanSQL,
            params: usedParams,
            parseJson: true
        };

        const [rows] = await bigquery.query(query);
        console.log(`Total rows: ${rows.length}`);

        const result = rows.map(convertBQValues);
        console.log(result);
        return result;
    } catch (e: any) {
        throw new DataTalkException(e.code, e.message, "run-sql");
    }
}

// const projectId = "datatalk-443fb";
export async function runSQLQueryRest(sql: string, projectId: string, accessToken: string) {

    try {
        const cleanSQL = sql
            .replaceAll("\\n", " ")
            .replaceAll("\\\\n", " ")
            .replaceAll("\n", " ")
            .replaceAll("\\'", "'")
            .replace(/\n/g, "")
            .replace(/\\\\/g, "");

        console.log(`Running query: ${sql}`);
        console.log(`Running clean query: ${cleanSQL}`);

        const payload = {
            query: cleanSQL
        };
        const response = await fetch(`https://bigquery.googleapis.com/bigquery/v2/projects/${projectId}/queries?prettyPrint=false`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            console.error(response);
            throw new Error(`Error running query: ${response.statusText}`);
        }

        const data = await response.json();
        const rows = data.rows; // Assuming the API returns rows in this format

        console.log(`Total rows: ${rows.length}`);

        const result = rows.map(convertBQValues);
        console.log(result);
        return result;
    } catch (e: any) {
        console.log(typeof e, util.inspect(e, true, null, true));
        throw new DataTalkException(e.code, e.message, "run-sql");
    }
}

function convertBQValues(obj: any): any {
    if (obj === null || obj === undefined) return obj;

    if (obj instanceof Big) {
        return obj.toNumber();
    }

    if (obj instanceof BigQueryDate) {
        return new Date(obj.value);
    }
    if (obj instanceof BigQueryDatetime) {
        return new Date(obj.value);
    }
    if (obj instanceof BigQueryTimestamp) {
        return new Date(obj.value);
    }
    if (obj instanceof BigQueryInt) {
        return new Date(obj.value);
    }

    if (Array.isArray(obj)) {
        return obj.map(item => convertBQValues(item));
    }

    if (typeof obj === "object") {
        const convertedObj: { [key: string]: any } = {};
        for (const key in obj) {
            // eslint-disable-next-line no-prototype-builtins
            if (obj.hasOwnProperty(key)) {
                convertedObj[key] = convertBQValues(obj[key]);
            }
        }
        return convertedObj;
    }

    return obj;
}

export async function getBigQueryDatasets(projectId: string, accessToken: string): Promise<DataSource> {
    const url = `https://www.googleapis.com/bigquery/v2/projects/${projectId}/datasets`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error(`Error fetching datasets: ${response.statusText}`);
    }

    const data = await response.json();
    return data.datasets.map((e: any) => ({
        ...e.datasetReference,
        location: e.location
    })) || []; // Handle cases where datasets might be empty
}

function convertParams(params?: DashboardParams): Record<string, any> {
    console.log("Converting params", params);

    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    const result = {
        DATE_START: threeMonthsAgo,
        DATE_END: new Date()
    }
    if (params?.dateStart) {
        result.DATE_START = params.dateStart;
    }
    if (params?.dateEnd) {
        result.DATE_END = params.dateEnd;
    }
    return result;
}
