import axios from "axios";

const ACT_API_BASE = "https://apius.act.com/act.web.api";

let cachedToken: string | null = null;
let tokenExpires: number = 0;

export async function getActToken(): Promise<string> {

  const now = Date.now();

  // reuse cached token if still valid
  if (cachedToken && now < tokenExpires) {
    return cachedToken;
  }

  const response = await axios.post(
    `${ACT_API_BASE}/api/token`,
    new URLSearchParams({
      grant_type: "password",
      username: process.env.ACT_USERNAME || "",
      password: process.env.ACT_PASSWORD || "",
      database: process.env.ACT_DATABASE || ""
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  );

  const token = response.data.access_token;

  // ACT tokens usually last 3600 seconds
  const expiresIn = response.data.expires_in || 3600;

  cachedToken = token;
  tokenExpires = now + (expiresIn - 60) * 1000;

  return token;
}