import axios from "axios";
import { getActToken } from "./actAuth";

const ACT_API_BASE = "https://apius.act.com/act.web.api";

export async function searchActContact(phone: string) {

  try {

    const normalized = phone.replace(/\D/g, "").slice(-10);

    const token = await getActToken();

    const headers = {
      Authorization: `Bearer ${token}`
    };

    const contactSearch = await axios.get(
      `${ACT_API_BASE}/api/contacts?$filter=
      contains(BUSINESS_PHONE,'${normalized}') or
      contains(MOBILE_PHONE,'${normalized}') or
      contains(DIRECT_LINE_PHONE,'${normalized}') or
      contains(HOME_PHONE,'${normalized}')`,
      { headers }
    );

    const contacts = contactSearch.data?.value || [];

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