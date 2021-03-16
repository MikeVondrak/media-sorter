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

export function appendNode(node: Node) {
  let fragment = document.createDocumentFragment();     
  fragment.appendChild(node);
  document.body.appendChild(fragment);
}

/**
 * Refresh list of templates from DOM and return html element matching template ID
 */
export function loadTemplateContentById(templateId: string, containerElement: HTMLElement | null, createHtmlId: string = ''): Node | null {
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
    console.log('ERROR! getTemplateContentById - tempate not found: ' + templateId);
    return null;
  }

  let templateContent = template?.content.cloneNode(true);
  if (!templateContent) {
    templateContent = document.createTextNode('Unable to load template: ' + templateId);
  } else if (!!createHtmlId && createHtmlId !== '') {
    const el = templateContent as HTMLElement;
    if (el.firstElementChild) {
      el.firstElementChild.id = createHtmlId;
    }
  }
  containerElement.innerHTML = '';
  containerElement.appendChild(templateContent);
  return templateContent;
}