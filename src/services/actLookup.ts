import axios from "axios";

/*
Act! Contact Lookup Service
Searches Act CRM for a contact using phone number
*/

export async function searchActContact(phone: string) {

  try {

    const ACT_API_URL = process.env.ACT_API_URL;
    const ACT_USERNAME = process.env.ACT_USERNAME;
    const ACT_PASSWORD = process.env.ACT_PASSWORD;
    const ACT_DATABASE = process.env.ACT_DATABASE;

    if (!ACT_API_URL || !ACT_USERNAME || !ACT_PASSWORD || !ACT_DATABASE) {
      throw new Error("Act environment variables missing");
    }

    // Get authentication token
    const authResponse = await axios.post(
      `${ACT_API_URL}/api/token`,
      {
        username: ACT_USERNAME,
        password: ACT_PASSWORD,
        database: ACT_DATABASE
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const token = authResponse.data.token;

    // Search contact by phone
    const response = await axios.get(
      `${ACT_API_URL}/api/contacts`,
      {
        params: {
          phone: phone
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (!response.data || response.data.length === 0) {
      return null;
    }

    const contact = response.data[0];

    return {
      id: contact.id,
      name: contact.name,
      company: contact.company,
      phone: contact.phone,
      email: contact.email
    };

  } catch (error) {

    console.error("Act lookup failed:", error);
    return null;

  }

}