
import { routes } from './routes';
import * as path from 'path';
import { ElectronApp } from './app';
import { dialog, ipcMain } from 'electron';
import { AppState, defaultAppState } from './models/app.model';

let appState: AppState = defaultAppState;

const windowOptions: Partial<Electron.BrowserWindowConstructorOptions> = {
  show: false, // wait for ready-to-show event before rendering to avoid pop-in
  width: 1080,
  minWidth: 320,
  height: 840,
  //backgroundColor: "#000",
  title: 'Media File Sorter',
  icon: path.join(__dirname, '../', '/assets/images/media-file-sorter-icon-16.png'),
  webPreferences: {
    nodeIntegration: true,
    enableRemoteModule: true 
  }
};

console.log('Initializing with window options:', windowOptions);

const electronApp: ElectronApp = 
  new ElectronApp( 
    'Media File Sorter', // app name
    windowOptions, // BrowserWindow config
    routes, // routes const
    'main' // html path to match in routes
  );

ipcMain.on('setSourceFolder', (event, arg) => {
  console.log('********* setSourceFolder: ' + arg);
  appState.sourceFolder = arg;
});

ipcMain.on('setDestinationFolder', (event, arg) => {
  console.log('********* setDestinationFolder: ' + arg);
  appState.destinationFolder = arg;
});