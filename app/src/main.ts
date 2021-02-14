import { app, App, BrowserWindow } from 'electron';
import * as path from 'path';
// const {app, BrowserWindow} = require('electron')
// const path = require('path')

// for Mac app store ??
//if (process.mas) app.setName('Media File Sorter');
app.setName('Media File Sorter');

const debug = /--debug/.test(process.argv[2]);

let mainWindow: BrowserWindow;

console.log('APP RUNNING');
debugger;
initialize();
console.log('APP INITIALIZED');
debugger;

function initialize() {

  function createWindow() {
    const windowOptions = {
      width: 1080,
      minWidth: 680,
      height: 840,
      title: app.getName(),
      webPreferences: {
        nodeIntegration: true
      }
    }
    mainWindow = new BrowserWindow(windowOptions);
    console.log("IN: " + __dirname);

    //mainWindow.loadURL(path.join('file://', __dirname, '../app/markup/main.html'))
    mainWindow.loadURL(path.join('file://', __dirname, './html/main.html'));

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
}


// const newWindowBtn = document.getElementById('new-window')

// newWindowBtn.addEventListener('click', (event) => {
//   const modalPath = path.join('file://', __dirname, '../../sections/windows/modal.html');
//   let win = new BrowserWindow({ width: 400, height: 320 });

//   win.on('close', () => { win = null });
//   win.loadURL(modalPath);
//   win.show();
// })

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