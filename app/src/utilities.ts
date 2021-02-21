
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