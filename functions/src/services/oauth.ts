import { google } from "googleapis";
import { Credentials } from "google-auth-library";
import axios, { AxiosResponse } from "axios";

export function getAuthUrl(redirect_uri: string) {
    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri as string
    );

    return oauth2Client.generateAuthUrl({
        access_type: "offline",
        prompt: "consent",
        scope: ["https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/cloud-platform"],
        include_granted_scopes: true
    });
}

export function getOauthTokenFromCode(code: string, redirect_uri: string): Promise<Credentials> {
    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri as string
    );

    return new Promise((resolve, reject) => {
        oauth2Client.getToken(code, (err: any, tokens?: Credentials | null) => {
            if (err) {
                console.error("Error retrieving access token", err.response.data);
                reject(err);
                return;
            }
            if (!tokens) {
                reject("No tokens returned");
                return;
            }
            resolve(tokens);
        });
    });
}


export function refreshOauthCredentials(credentials: Credentials): Promise<Credentials> {
    const client_id = process.env.GOOGLE_CLIENT_ID as string;
    const client_secret = process.env.GOOGLE_CLIENT_SECRET as string;
    const refresh_token = credentials["refresh_token"] as string;

    const postData = new URLSearchParams();
    postData.append("client_id", client_id);
    postData.append("client_secret", client_secret);
    postData.append("refresh_token", refresh_token);
    postData.append("grant_type", "refresh_token");

    return axios({
        method: "post",
        url: "https://oauth2.googleapis.com/token",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: postData.toString()
    })
        .then((res: AxiosResponse) => {
            console.log(res.data);
            return res.data;
        });
}
