import * as path from 'path';

// https://github.com/microsoft/TypeScript/issues/35859
/**
 * Get value for 'key' from const obj
 * - avoid: Element implicitly has an 'any' type because index expression is not of type 'number'.ts(7015)
 * usage:
 *  let value = getKeyValue(obj)(property);
 * @param obj
 * @param key
 */
export const getKeyValue = <T extends object, U extends keyof T>(obj: T) => (key: U) => obj[key];

/**
 * Use path to resolve compound file/folder path
 * - include '../' by default so URLs are relative to /app/
 */
export function getPath(uri: string): string {
  const uriPath = path.join(__dirname, '../', uri);
  return uriPath;
}