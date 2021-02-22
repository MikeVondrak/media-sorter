//export type ElectronActions = 'activate' | 'ready' | 'ready-to-show' | 'second-instance' | 'closed' | 'window-all-closed';
export type AppActions = 'app-state-update' | 'main-window-ready' | 'template-loaded' | 'template-from-html';
export type SettingsActions = 'set-source-folder' | 'set-output-folder';

export const appActions = {
  appStateUpdate: 'app-state-update' as AppActions,
  mainWindowReady: 'main-window-ready' as AppActions,
  templateLoaded: 'template-loaded' as AppActions,
  templateFromHtml: 'template-from-html' as AppActions,
};

export const settingsActions = {
  setSourceFolder: 'set-source-folder' as SettingsActions,
  setOutputFolder: 'set-output-folder' as SettingsActions,
}