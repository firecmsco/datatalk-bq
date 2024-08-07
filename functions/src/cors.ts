import cors from "cors";

const whitelist = [
    "datatalk-443fb.web.app",
    "app.dataki.ai",
    /https:\/\/datatalk-443fb.web.app(:\\d+)?/,
    /https:\/\/app.dataki.ai(:\\d+)?/,
    /http:\/\/localhost(:\d+)?/,
    /http:\/\/127\.0\.0\.1(:\d+)?/
];

const corsOptions = {
    origin: whitelist,
    optionsSuccessStatus: 200,
    credentials: true,
    preflightContinue: true
};


export const createCorsConfig = () => {
    return cors(corsOptions);
}

export const corsAllAllowed = () => {
    return cors({
        origin: true,
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204,
        allowedHeaders: ["Content-Type", "Authorization", "x-de-api-key", "x-de-version", "Allow", "Accept", "access-control-allow-origin"],
        methods: ["POST", "OPTIONS"],
        preflightContinue: false
    });
}
