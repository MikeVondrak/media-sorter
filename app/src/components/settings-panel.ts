import { ipcRenderer } from "electron";
import { appActions } from "../models/actions";
import { AppState, UiProperty } from "../models/app.model";
import { loadTemplateContentById } from "../utilities";

const containerHtmlId = 'Settings-Panel';
const templateId = 'Settings-Panel-Template'; // from data-template-id attr
const templateHtmlFile = 'settings-panel.html';
const htmlIdStatePropertyAssoc: UiProperty[] = [
  { htmlId: 'Settings-Source-Folder-Label', stateProperty: 'sourceFolder', uiLabel: '' },
  { htmlId: 'Settings-Destination-Folder-Label', stateProperty: 'destinationFolder', uiLabel: '' },
];

const containerEl = document.getElementById(containerHtmlId);

function loadTemplate() {
  loadTemplateContentById(templateId, containerEl);  
}

function updateTemplate(appState: AppState) {
  htmlIdStatePropertyAssoc.forEach(assoc => {
    let el = document.getElementById(assoc.htmlId || '');
    let val = appState[assoc.stateProperty as keyof AppState];
    console.log('>>>>> settingsPanel - updateTemplate el: ' + el + ', val: ' + val);
    if (el) {
      el.innerText = val as string;
    }
  })
}

ipcRenderer.on(appActions.appStateUpdate, (event, appState) => {
  console.log('>>>>> settingsPanel - app-state-update');
  updateTemplate(appState);
});

// TODO: move this to a common function to update all templates
ipcRenderer.on(appActions.mainWindowReady, () => {
  console.log('>>>>> settingsPanel - main-window-ready');
  loadTemplate();
});

ipcRenderer.on(appActions.templateLoaded, (event, file) => {
  console.log('>>>>> settingsPanel - template-loaded: ', file);
  if (file === templateHtmlFile) {
    console.log('>>>>> settingsPanel - template-loaded - updating ', file);
    loadTemplate();
  }
});

console.log('>>>>> settingsPanel - init');