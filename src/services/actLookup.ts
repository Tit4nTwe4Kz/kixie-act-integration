import axios from "axios";

/*
Act! Contact Lookup Service
Searches Act CRM for a contact using phone number
*/

export async function searchActContact(phone: string) {

  try {

    const ACT_API_URL = process.env.ACT_API_URL;
    const ACT_API_KEY = process.env.ACT_API_KEY;

    if (!ACT_API_URL || !ACT_API_KEY) {
      throw new Error("Act API environment variables missing");
    }

    const response = await axios.get(
      `${ACT_API_URL}/contacts`,
      {
        params: {
          phone: phone
        },
        headers: {
          Authorization: `Bearer ${ACT_API_KEY}`
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