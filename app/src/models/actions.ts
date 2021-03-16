//export type ElectronActions = 'activate' | 'ready' | 'ready-to-show' | 'second-instance' | 'closed' | 'window-all-closed';
export type AppActions = 'app-state-update' | 'main-window-ready' | 'template-loaded' | 'template-from-html';
export type LoadHtmlActions = 'template-from-html' | 'template-loading-done';
export type SettingsActions = 'set-source-folder' | 'set-output-folder';

export const appActions = {
  appStateUpdate: 'app-state-update' as AppActions, // fired when any part of the app state has changed to notify renderers
  mainWindowReady: 'main-window-ready' as AppActions, // Electron window ready event
  //templateFromHtml: 'template-from-html' as AppActions, // from load-html when template is read in from file and appended to DOM
  //templateFromHtmlDone: 'template-loading-done' as AppActions, // from load-html when all template html files appended to end of DOM
  templateLoaded: 'template-loaded' as AppActions, // from main after templateFromHtml received to notify renderers
  allTemplatesLoaded: 'templates-loaded' as AppActions, // from main after templateFromHtmlDone recieved from load-html
  allSectionsLoaded: 'sections-loaded' as AppActions, // from main after sectionContentsLoaded received from load-sections
};

export const loadHtmlActions = {
  templateFromHtml: 'template-from-html' as LoadHtmlActions,
  templateFromHtmlDone: 'template-loading-done' as LoadHtmlActions,
}

export const sectionActions = {
  sectionTemplatesLoaded: 'section-templates-loaded', // TODO: don't need this?
  sectionContentsLoaded: 'section-contents-loaded',
}

export const settingsActions = {
  setSourceFolder: 'set-source-folder' as SettingsActions,
  setOutputFolder: 'set-output-folder' as SettingsActions,
}