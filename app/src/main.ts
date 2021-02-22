
import { ipcMain } from 'electron';
import { ElectronApp } from './app';
import { routes } from './routes';
import { AppState, defaultAppState } from './models/app.model';
import { getPath } from './utilities';
import { appActions, AppActions, settingsActions } from './models/actions';

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
    this.emitToWebContents(appActions.mainWindowReady);
  }

  private registerIpcMainEvents() {
    ipcMain.on(settingsActions.setSourceFolder, (event, folderPath: string) => {
      console.log('***** setSourceFolder: ' + folderPath);
      this.appState.sourceFolder = folderPath;
      this.emitToWebContents(appActions.appStateUpdate, this.appState);
    });
  
    ipcMain.on(settingsActions.setOutputFolder, (event, folderPath: string) => {
      
      console.log('*****' + settingsActions.setOutputFolder, folderPath);

      this.appState.destinationFolder = folderPath;
      this.emitToWebContents(appActions.appStateUpdate, this.appState);
    });

    ipcMain.on(appActions.templateFromHtml, (event, filename: string) => {
      console.log('***** templateLoaded: ', filename);
      this.emitToWebContents(appActions.templateLoaded, filename);
    });
  }

  private emitToWebContents(event: AppActions, args?: string | AppState) {
    const mainWindow = this.electronApp.getMainWindow();
    if (!mainWindow) {
      throw new Error('Main Window Undefined in emitToWebContents');
    }
    mainWindow.webContents.send(event, args);
  }
}

const mainApp = new MediaFileSortApp();


