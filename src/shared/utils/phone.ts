export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');

  if (cleaned.length === 13) {
    const country = cleaned.slice(0, 2);
    const area = cleaned.slice(2, 4);
    const prefix = cleaned.slice(4, 9);
    const line = cleaned.slice(9, 13);
    return `+${country} (${area}) ${prefix}-${line}`;
  }

  if (cleaned.length === 11) {
    const area = cleaned.slice(0, 2);
    const prefix = cleaned.slice(2, 7);
    const line = cleaned.slice(7, 11);
    return `(${area}) ${prefix}-${line}`;
  }

  return phone;
}
