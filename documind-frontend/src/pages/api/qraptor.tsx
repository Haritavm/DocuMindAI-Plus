// import type { NextApiRequest, NextApiResponse } from "next";

// export async function runAgent({
//   agentName,
//   userVariables,
// }: {
//   agentName: string;
//   userVariables: Record<string, any>;
// }) {
//   try {
//     // 🔑 Step 1: Auth request
//     const authParams = new URLSearchParams();
//     authParams.append("username", process.env.QRAPTOR_USERNAME!);
//     authParams.append("password", process.env.QRAPTOR_PASSWORD!);
//     authParams.append("grant_type", "password");
//     authParams.append("client_id", process.env.QRAPTOR_CLIENT_ID!);
//     authParams.append("client_secret", process.env.QRAPTOR_CLIENT_SECRET!);

//     const authResponse = await fetch(
//       "https://portal.qraptor.ai/auth/realms/appz9mlboghvw6kf/protocol/openid-connect/token",
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/x-www-form-urlencoded" },
//         body: authParams,
//       }
//     );

//     const authData = await authResponse.json();
//     const accessToken = authData.access_token;

//     if (!accessToken) {
//       console.error("❌ Authentication failed:", authData);
//       throw new Error("Authentication failed");
//     }

//     // 🔑 Step 2: Pick correct endpoint from .env
//     const agentEndpoint =
//       agentName === "DocumentRecommendAgent"
//         ? process.env.AGENT_ENDPOINT_DOCUMENT_UPLOAD
//         : process.env.AGENT_ENDPOINT_BUSINESS_IDEA;

//     if (!agentEndpoint) {
//       throw new Error(`❌ Missing endpoint for agent: ${agentName}`);
//     }

//     // 🔑 Step 3: Call agent
//     const agentResponse = await fetch(agentEndpoint, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         agentName,
//         userVariables,
//       }),
//     });

//     const rawText = await agentResponse.text();

//     let parsed;
//     try {
//       parsed = JSON.parse(rawText);
//     } catch {
//       parsed = { raw: rawText };
//     }

//     // 🔑 Debug logging
//     console.log(`✅ Agent [${agentName}] response:`, parsed);

//     if (!agentResponse.ok) {
//       throw new Error(
//         `Agent error (${agentResponse.status}): ${parsed?.message || rawText
//         }`
//       );
//     }

//     return parsed;
//   } catch (error) {
//     console.error("❌ runAgent Error:", error);
//     throw error;
//   }
// }
import type { NextApiRequest, NextApiResponse } from "next";
import { runAgent } from "@/lib/qraptor";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { agentName, userVariables } = req.body;

    if (!agentName || !userVariables) {
      return res.status(400).json({ error: "Missing agentName or userVariables" });
    }

    const result = await runAgent({ agentName, userVariables });

    res.status(200).json(result);
  } catch (error: any) {
    console.error("❌ API /qraptor error:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
}
