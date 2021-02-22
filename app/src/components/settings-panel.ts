import { ipcRenderer } from "electron";
import { loadTemplateContentById } from "../utilities";

const containerHtmlId = 'Settings-Panel';
const templateId = 'Settings-Panel-Template'; // from data-template-id attr
const templateHtmlFile = 'settings-panel.html';

const containerEl = document.getElementById(containerHtmlId);

function loadTemplates() {
  loadTemplateContentById(templateId, containerEl);  
}

// TODO: move this to a common function to update all templates
ipcRenderer.on('main-window-ready', () => {
  console.log('>>>>> settingsPanel - main-window-ready');
  loadTemplates();
});

ipcRenderer.on('template-loaded', (err, file) => {
  console.log('>>>>> settingsPanel - template-loaded: ', file);
  if (file === templateHtmlFile) {
    console.log('>>>>> settingsPanel - template-loaded - updating ', file);
    loadTemplates();
  }
});

console.log('>>>>> settingsPanel - init');