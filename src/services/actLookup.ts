import axios from "axios";

const ACT_API_BASE = "https://apius.act.com/act.web.api";

export async function searchActContact(phone: string) {

  try {

    const normalized = phone.replace(/\D/g, "").slice(-10);

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

    const headers = {
      Authorization: `Bearer ${token}`
    };

    // CONTACT SEARCH
    const contactSearch = await axios.get(
      `${ACT_API_BASE}/api/contacts?$filter=
      contains(BUSINESS_PHONE,'${normalized}') or
      contains(MOBILE_PHONE,'${normalized}') or
      contains(DIRECT_LINE_NUMBERDISPLAY,'${normalized}') or
      contains(HOME_PHONE,'${normalized}')`,
      { headers }
    );

    if (contactSearch.data?.value?.length) {
      return contactSearch.data.value[0];
    }

    // COMPANY SEARCH
    const companySearch = await axios.get(
      `${ACT_API_BASE}/api/companies?$filter=
      contains(PHONE,'${normalized}') or
      contains(TOLL_FREE_NUMBERDISPLAY,'${normalized}')`,
      { headers }
    );

    if (companySearch.data?.value?.length) {
      return companySearch.data.value[0];
    }

    return null;

  } catch (error) {

    console.error("Act lookup failed:", error);
    return null;

  }

}