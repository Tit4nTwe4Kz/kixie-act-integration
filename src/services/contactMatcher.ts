import { normalizePhone } from "../utils/phoneNormalizer";

export function matchContact(phone: string, contacts: any[]) {

  const normalized = normalizePhone(phone);

  const matches = contacts.filter((contact) => {
    return (
      contact.businessPhone === normalized ||
      contact.mainPhone === normalized ||
      contact.mobilePhone === normalized
    );
  });

  if (matches.length === 0) {
    return null;
  }

  if (matches.length === 1) {
    return matches[0];
  }

  // choose most recently engaged contact

  matches.sort((a, b) => {
    const aTime = new Date(a.lastActivity).getTime();
    const bTime = new Date(b.lastActivity).getTime();

    return bTime - aTime;
  });

  return matches[0];
}