import axios from "axios";

const ACT_API_BASE = "https://apius.act.com/act.web.api";

let cachedToken: string | null = null;
let tokenExpires = 0;

function encodeCredentials(username: string, password: string) {
  return Buffer.from(`${username}:${password}`).toString("base64");
}

export async function getActToken(): Promise<string> {

  const now = Date.now();

  if (cachedToken && now < tokenExpires) {
    return cachedToken;
  }

  const username = process.env.ACT_USERNAME || "";
  const password = process.env.ACT_PASSWORD || "";
  const database = process.env.ACT_DATABASE || "";

  const basicAuth = encodeCredentials(username, password);

  const response = await axios.get(
    `${ACT_API_BASE}/authorize`,
    {
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Act-Database-Name": database
      }
    }
  );

  const token = response.data;

  cachedToken = token;
  tokenExpires = now + (3600 - 60) * 1000;

  return token;
}