
import { ipcMain } from 'electron';
import { ElectronApp } from './app';
import { routes } from './routes';
import { AppState, defaultAppState } from './models/app.model';
import { getPath } from './utilities';

class MediaFileSortApp {

  private readonly windowOptions: Partial<Electron.BrowserWindowConstructorOptions> = {
    show: false, // false = wait for ready-to-show event before rendering to avoid pop-in
    width: 1080,
    minWidth: 320,
    height: 840,
    //backgroundColor: "#000",
    title: 'Media File Sorter',
    icon: getPath('/assets/images/media-file-sorter-icon-16.png'),
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true 
    }
  };

  private readonly electronApp: ElectronApp;
  private appState: AppState = defaultAppState;

  /**
   * Constructor
   */
  constructor() {
    const windowReady = this.handleMainWindowReady.bind(this);
    this.electronApp = new ElectronApp( 
      'Media File Sorter', // app name
      this.windowOptions, // BrowserWindow config
      routes, // routes const
      'main', // html path to match in routes
      windowReady
    );
    this.registerIpcMainEvents();
  }

  private handleMainWindowReady() {
    console.log('***** handleMainWindowReady');
    this.electronApp.getMainWindow()?.webContents.send('main-window-ready');
  }

  private registerIpcMainEvents() {
    ipcMain.on('setSourceFolder', (event, arg) => {
      console.log('***** setSourceFolder: ' + arg);
      this.appState.sourceFolder = arg;
      this.emitToWebContents('app-state-update', this.appState);
    });
  
    ipcMain.on('setDestinationFolder', (event, arg) => {
      console.log('***** setDestinationFolder: ' + arg);
      this.appState.destinationFolder = arg;
      this.emitToWebContents('app-state-update', this.appState);
    });

    ipcMain.on('templateLoaded', (event, arg) => {
      console.log('***** templateLoaded: ', arg);
      this.electronApp.getMainWindow()?.webContents.send('template-loaded', arg);
    });
  }

  private emitToWebContents(event: string, args?: any) {
    const mainWindow = this.electronApp.getMainWindow();
    if (!mainWindow) {
      throw new Error('Main Window Undefined in emitToWebContents');
    }
    mainWindow.webContents.send(event, args);
  }
}

const mainApp = new MediaFileSortApp();


