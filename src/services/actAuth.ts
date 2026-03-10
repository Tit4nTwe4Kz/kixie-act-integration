import axios from "axios";

const ACT_API_BASE = process.env.ACT_API_URL || "https://apius.act.com/act.web.api";

let cachedToken: string | null = null;
let tokenExpires = 0;

export async function getActToken(): Promise<string> {

  const now = Date.now();

  if (cachedToken && now < tokenExpires) {
    return cachedToken;
  }

  const response = await axios.post(
    `${ACT_API_BASE}/api/authorize`,
    {
      username: process.env.ACT_USERNAME,
      password: process.env.ACT_PASSWORD,
      database: process.env.ACT_DATABASE
    },
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  const token = response.data.access_token;
  const expires = response.data.expires_in || 3600;

  cachedToken = token;
  tokenExpires = now + (expires - 60) * 1000;

  return token;
}