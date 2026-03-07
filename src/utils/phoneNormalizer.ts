export function normalizePhone(phone: string): string {

  const digits = phone.replace(/\D/g, "");

  if (digits.length !== 10) {
    return phone;
  }

  const area = digits.substring(0, 3);
  const prefix = digits.substring(3, 6);
  const line = digits.substring(6);

  return `(${area}) ${prefix}-${line}`;
}