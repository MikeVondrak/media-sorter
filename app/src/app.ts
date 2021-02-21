import { app, App, BrowserWindow, ipcMain, dialog } from 'electron';
//import installExtension, { REDUX_DEVTOOLS } from 'electron-devtools-installer';
import * as path from 'path';
import { Routes, RouteValue } from './models/routes.model';
import { getKeyValue } from './utilities';

export class ElectronApp {
  
  /**
   * Constants
   */
  private readonly debug = /--debug/.test(process.argv[2]);
  private readonly defaultWindowOptions: Electron.BrowserWindowConstructorOptions = {
    show: false, // wait for ready-to-show event before rendering to avoid pop-in
    width: 1080,
    minWidth: 320,
    height: 840,
    //backgroundColor: "#000",
    title: '',
    //icon: __dirname + '/assets/images/media-file-sorter-icon-16.png',
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    }
  }

  /**
   * Private members
   */
  private mainWindow?: BrowserWindow = undefined;
  private options: Electron.BrowserWindowConstructorOptions;


  /**
   * Constructor
   * @param windowOptions Partial options for generating Electron BrowserWindow
   */
  public constructor(
    appName: string,
    windowOptions: Partial<Electron.BrowserWindowConstructorOptions>,
    private routes: Routes,
    private mainPagePath: string,
  ) {
    app.setName(appName);
    this.options = { ...this.defaultWindowOptions, ...windowOptions };
    
    this.makeSingleInstance();
    this.attachAppEvents();
  }

  /**
   * FROM ELECTRON DEMO
   * Make this app a single instance app.
   *
   * The main window will be restored and focused instead of a second window
   * opened when a person attempts to launch a second instance.
   *
   * Returns true if the current version of the app should quit instead of
   * launching.
   */
  private makeSingleInstance () {
    if (process.mas) return;

    app.requestSingleInstanceLock();

    app.on('second-instance', () => {
      if (this.mainWindow) {
        if (this.mainWindow.isMinimized()) this.mainWindow.restore();
        this.mainWindow.focus();
      }
    }); 
  }

  /**
   * Attach events for ready, activate, window close
   */
  private attachAppEvents() {
    app.on('ready', () => {
      this.initWindow();
    });

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    app.on('activate', () => {
      if (this.mainWindow === null) {
        this.initWindow();
      }
    });
  }

  /**
   * Intialize the main window for the app with the main page html
   */
  private initWindow() {
    this.mainWindow = new BrowserWindow(this.options);
    const window = this.mainWindow as BrowserWindow;

    this.mainWindow.once('ready-to-show', () => window.show());

    let mainPagePath = this.routes.html._root;

    const htmlPaths = this.routes?.html?.paths;
    if (!htmlPaths) {
      throw new Error('Could not find html routes: ' + htmlPaths);
    }
    const mainPage = htmlPaths.find(path => {
      const pathKey = Object.keys(path)[0];
      return pathKey === this.mainPagePath;
    });
    if (!mainPage) {
      throw new Error('Could not find route for main page: ' + this.mainPagePath);
    }
    
    const mainPageFile = getKeyValue(mainPage)(this.mainPagePath);
    mainPagePath += mainPageFile;

    console.log("Loading: " + __dirname, mainPagePath);

    this.mainWindow.loadURL(path.join('file://', __dirname, '../', mainPagePath));

    // Launch fullscreen with DevTools open, usage: npm run dev
    if (this.debug) {
      console.log('!!!!!!!!!! DEBUGGING');
      this.mainWindow.webContents.openDevTools();
      this.mainWindow.maximize();
      //require('devtron').install();
    }

    this.mainWindow.on('closed', () => {
      this.mainWindow = null as any;
    })
  }
}