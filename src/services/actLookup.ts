import axios from "axios";

const ACT_API_BASE = "https://apius.act.com/act.web.api";

export async function searchActContact(phone: string) {

  try {

    const normalized = phone.replace(/\D/g, "").slice(-10);

    // AUTHENTICATION
    const tokenResponse = await axios.post(
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

    const token = tokenResponse.data.access_token;

    const headers = {
      Authorization: `Bearer ${token}`
    };

    // CONTACT SEARCH
    const contactSearch = await axios.get(
      `${ACT_API_BASE}/api/contacts?$filter=
      contains(BUSINESS_PHONE,'${normalized}') or
      contains(MOBILE_PHONE,'${normalized}') or
      contains(DIRECT_LINE_PHONE,'${normalized}') or
      contains(HOME_PHONE,'${normalized}')`,
      { headers }
    );

    const contacts = contactSearch.data?.value || [];

    // RULE 6 — DUPLICATE DETECTION
    if (contacts.length > 1) {

      console.warn("Duplicate phone numbers detected:", normalized);

      for (const contact of contacts) {

        try {

          await axios.patch(
            `${ACT_API_BASE}/api/contacts(${contact.ID})`,
            {
              Phone_Duplicate_Flag: "Yes"
            },
            { headers }
          );

        } catch (flagError) {

          console.error("Failed to flag duplicate contact:", contact.ID);

        }

      }

      return contacts[0];

    }

    if (contacts.length === 1) {
      return contacts[0];
    }

    // COMPANY SEARCH
    const companySearch = await axios.get(
      `${ACT_API_BASE}/api/companies?$filter=
      contains(PHONE,'${normalized}') or
      contains(TOLL_FREE_PHONE,'${normalized}')`,
      { headers }
    );

    const companies = companySearch.data?.value || [];

    if (companies.length) {
      return companies[0];
    }

    return null;

  } catch (error) {

    console.error("ACT lookup failed:", error);
    return null;

  }

}