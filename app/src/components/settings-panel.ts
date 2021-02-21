const containerHtmlId = "Settings-Panel";
const templateId = "Settings-Panel-Template"; // from data-template-id attr

const containerEl = document.getElementById(containerHtmlId);

const templatesCollection = document.getElementsByTagName('template');
const templatesArray = Array.from(templatesCollection);
const template = templatesArray.find(template => template.dataset.templateId === templateId);

debugger;
if (containerEl) {
  containerEl.innerHTML = containerEl?.innerHTML && template?.outerHTML ? template.outerHTML : 'Error rendering template: ' + templateId;
} else {
  throw new Error('Could not find container for template: ' + templateId);
}

console.log('%%%%%%%%%%%% SETTINGS PANEL');