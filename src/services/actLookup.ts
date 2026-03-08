import axios from "axios";

const ACT_API_BASE = "https://appus.act.com/act.web.api";

export async function searchActContact(phone: string) {
  try {

    const tokenResponse = await axios.post(
      `${ACT_API_BASE}/api/token`,
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

    const token = tokenResponse.data.access_token;

    const searchResponse = await axios.get(
      `${ACT_API_BASE}/api/contacts?phone=${phone}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return searchResponse.data;

  } catch (error) {
    console.error("Act lookup failed:", error);
    return null;
  }
}