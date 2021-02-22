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

/**
 * Refresh list of templates from DOM and return html element matching template ID
 */
export function loadTemplateContentById(templateId: string, containerElement: HTMLElement | null): void {
  if (!containerElement) {
    throw new Error('No container for template: ' + templateId);
  }

  let templatesCollection: HTMLCollectionOf<HTMLTemplateElement>;
  let templatesArray: HTMLTemplateElement[];

  templatesCollection = document.getElementsByTagName('template');
  templatesArray = Array.from(templatesCollection);

  console.log('getTemplateContentById: ' + templateId + ' - template collection: ' + templatesCollection.length + ', array: ', templatesArray);
  
  const template = templatesArray.find(template => {
    return template.dataset.templateId === templateId
  });
  if (!template) {
    console.log('getTemplateContentById - tempate not found: ' + templateId);
    return;
  }

  let templateContent = template?.content.cloneNode(true);
  if (!templateContent) {
    templateContent = document.createTextNode('Unable to load template: ' + templateId);
  }
  containerElement.innerHTML = '';
  containerElement.appendChild(templateContent);
  // return templateContent;
}