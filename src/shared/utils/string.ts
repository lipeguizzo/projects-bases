export function removeSpecialCharacters(value: string): string {
  return value.replace(/[^a-zA-Z0-9]/g, '');
}

export function isInEnum<T extends Record<string, string | number>>(
  value: string,
  enumData: T,
): boolean {
  return Object.values(enumData).includes(value);
}

export function convertStringToArray<T>(arrayString: string): T[] {
  return arrayString
    .split(',')
    .map((item: string) => item.replace(/[\[\]']+/g, '').trim()) as T[];
}
