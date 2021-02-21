import { app, App, BrowserWindow, ipcMain, dialog } from 'electron';
import * as path from 'path';
import { routes } from './routes';
import * as fs from 'fs';
// const {app, BrowserWindow} = require('electron')
// const path = require('path')

// for Mac app store ??
//if (process.mas) app.setName('Media File Sorter');
app.setName('Media File Sorter');

const debug = /--debug/.test(process.argv[2]);

let mainWindow: BrowserWindow;

initialize();
console.log('APP INITIALIZED');

function initialize() {

  function createWindow() {
    const windowOptions = {
      show: false, // wait for ready-to-show event before rendering to avoid pop-in
      width: 1080,
      minWidth: 320,
      height: 840,
      //backgroundColor: "#000",
      title: app.getName(),
      icon: __dirname + '/assets/images/media-file-sorter-icon-16.png',
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
      }
    }
    mainWindow = new BrowserWindow(windowOptions);
    mainWindow.once('ready-to-show', () => mainWindow.show());

    const mainPage = routes.html._root + 'main'; // routes.html.main;
    console.log("Loading: " + __dirname + mainPage);

    mainWindow.loadURL(path.join('file://', __dirname, mainPage));

    // Launch fullscreen with DevTools open, usage: npm run debug
    if (debug) {
      mainWindow.webContents.openDevTools();
      mainWindow.maximize();
      require('devtron').install();
    }

    mainWindow.on('closed', () => {
      mainWindow = null as any;
    })
  }

  makeSingleInstance();
  attachAppEvents(app, createWindow);
  
  
  // loadApp();
}

// FROM ELECTRON DEMO
// Make this app a single instance app.
//
// The main window will be restored and focused instead of a second window
// opened when a person attempts to launch a second instance.
//
// Returns true if the current version of the app should quit instead of
// launching.
function makeSingleInstance () {
  if (process.mas) return;

  app.requestSingleInstanceLock();

  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  }); 
}

/**
 * Attach events for ready, activate, window close
 * @param app electron App object
 * @param createWindow function to call after window is created
 */
function attachAppEvents(app: App, createWindow: () => void) {
  app.on('ready', () => {
    createWindow();
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  // ipcMain.on('openFile', (event, arg) => {

  // })
}
