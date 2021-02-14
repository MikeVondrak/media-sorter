const {app, BrowserWindow} = require('electron')
const path = require('path')

// for Mac app store ??
if (process.mas) app.setName('Media File Sorter');

function initialize() {
  makeSingleInstance();
  attachAppEvents(app);
  loadApp();


  
}

function attachAppEvents(app) {
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

function loadApp() {

}

function createWindow() {

}

const newWindowBtn = document.getElementById('new-window')

newWindowBtn.addEventListener('click', (event) => {
  const modalPath = path.join('file://', __dirname, '../../sections/windows/modal.html');
  let win = new BrowserWindow({ width: 400, height: 320 });

  win.on('close', () => { win = null });
  win.loadURL(modalPath);
  win.show();
})

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