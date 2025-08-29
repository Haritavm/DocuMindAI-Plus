
// import type { NextApiRequest, NextApiResponse } from "next";

// let cachedAccessToken: string | null = null;
// let tokenExpiry = 0;

// export async function runAgent({ agentName, userVariables, file }: { agentName: string; userVariables?: any; file?: File }) {
//     const accessToken = await getAccessToken();
//     if (!accessToken) throw new Error("Failed to get access token");

//     // Map agentName → endpoint
//     const endpoints: Record<string, string | undefined> = {
//         SignupAgent: process.env.AGENT_ENDPOINT_SIGNUP,
//         LoginAgent: process.env.AGENT_ENDPOINT_LOGIN,
//         DocumentRecommendAgent: process.env.AGENT_ENDPOINT_DOCUMENT_RECOMMEND,
//         DocumentUploadAgent: process.env.AGENT_ENDPOINT_DOCUMENT_UPLOAD,
//         DocumentVerificationAgent: process.env.AGENT_ENDPOINT_DOCUMENT_VERIFICATION,
//     };

//     const agentEndpoint = endpoints[agentName];
//     if (!agentEndpoint) throw new Error(`Unknown agent: ${agentName}`);

//     // Prepare body
//     let body: any;
//     let headers: any = {
//         Authorization: `Bearer ${accessToken}`,
//     };

//     if (file) {
//         // For file uploads, use FormData
//         body = new FormData();
//         body.append("file", file);
//         if (userVariables) {
//             body.append("userVariables", JSON.stringify(userVariables));
//         }
//         // Let fetch set multipart headers automatically
//     } else {
//         body = JSON.stringify({ userVariables, agentName });
//         headers["Content-Type"] = "application/json";
//     }

//     const res = await fetch(agentEndpoint, { method: "POST", headers, body });
//     if (!res.ok) throw new Error(`Agent call failed: ${res.statusText}`);
//     return res.json();
// }

// /**
//  * 🔑 Helper: fetch & cache token
//  */
// async function getAccessToken(): Promise<string | null> {
//     if (cachedAccessToken && Date.now() < tokenExpiry) return cachedAccessToken;

//     const authParams = new URLSearchParams();
//     authParams.append("username", process.env.QRAPTOR_USERNAME!);
//     authParams.append("password", process.env.QRAPTOR_PASSWORD!);
//     authParams.append("grant_type", "password");
//     authParams.append("client_id", process.env.QRAPTOR_CLIENT_ID!);

//     const authResponse = await fetch(
//         "https://portal.qraptor.ai/auth/realms/appz9mlboghvw6kf/protocol/openid-connect/token",
//         {
//             method: "POST",
//             headers: { "Content-Type": "application/x-www-form-urlencoded" },
//             body: authParams,
//         }
//     );

//     const authData = await authResponse.json();
//     if (!authData.access_token) return null;

//     cachedAccessToken = authData.access_token;
//     tokenExpiry = Date.now() + authData.expires_in * 1000;

//     return cachedAccessToken;
// }
import type { NextApiRequest, NextApiResponse } from "next";

let cachedAccessToken: string | null = null;
let tokenExpiry = 0;

export async function runAgent({
    agentName,
    userVariables,
    file,
}: {
    agentName: string;
    userVariables?: any;
    file?: File;
}) {
    const accessToken = await getAccessToken();
    if (!accessToken) throw new Error("Failed to get access token");

    // Map agentName → endpoint
    const endpoints: Record<string, string | undefined> = {
        SignupAgent: process.env.AGENT_ENDPOINT_SIGNUP,
        LoginAgent: process.env.AGENT_ENDPOINT_LOGIN,
        DocumentRecommendAgent: process.env.AGENT_ENDPOINT_DOCUMENT_RECOMMEND,
        DocumentUploade: process.env.AGENT_ENDPOINT_DOCUMENT_UPLOAD,
        DocumentVerificationAgent: process.env.AGENT_ENDPOINT_DOCUMENT_VERIFICATION,
    };

    const agentEndpoint = endpoints[agentName];
    if (!agentEndpoint) throw new Error(`Unknown agent: ${agentName}`);

    let body: any;
    const headers: any = { Authorization: `Bearer ${accessToken}` };

    if (file) {
        // ✅ Use FormData for file upload
        body = new FormData();
        body.append("file", file);
        if (userVariables) body.append("userVariables", JSON.stringify(userVariables));
        // Do not set content-type; browser sets it automatically
    } else {
        // JSON request for non-file agents
        body = JSON.stringify({ userVariables, agentName });
        headers["Content-Type"] = "application/json";
    }

    const response = await fetch(agentEndpoint, {
        method: "POST",
        headers,
        body,
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Agent call failed: ${response.status} - ${text}`);
    }

    return response.json();
}

/**
 * 🔑 Helper: fetch & cache token
 */
async function getAccessToken(): Promise<string | null> {
    if (cachedAccessToken && Date.now() < tokenExpiry) return cachedAccessToken;

    const authParams = new URLSearchParams();
    authParams.append("username", process.env.QRAPTOR_USERNAME!);
    authParams.append("password", process.env.QRAPTOR_PASSWORD!);
    authParams.append("grant_type", "password");
    authParams.append("client_id", process.env.QRAPTOR_CLIENT_ID!);

    const authResponse = await fetch(
        "https://portal.qraptor.ai/auth/realms/appz9mlboghvw6kf/protocol/openid-connect/token",
        {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: authParams,
        }
    );

    const authData = await authResponse.json();
    if (!authData.access_token) {
        console.error("Failed to get Qraptor token:", authData);
        return null;
    }

    cachedAccessToken = authData.access_token;
    tokenExpiry = Date.now() + authData.expires_in * 1000;
    return cachedAccessToken;
}
