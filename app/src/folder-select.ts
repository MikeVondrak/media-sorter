import { ipcRenderer } from "electron";
import { OpenDialogResult } from "./models/electron.model";

const { dialog } = require('electron').remote;

console.log('>>>>> folder-select');

function attachMainPageEventHandlers() {
  const sourceFolderBtnId = 'Select-Source-Folder-Btn';
  const destinationFolderBtnId = 'Select-Destination-Folder-Btn';
  const sourceFolderLabelId = 'Select-Source-Folder-Label';
  const destinationFolderLabelId = 'Select-Destination-Folder-Label';

  debugger;
  console.log('>>>>> folder-select running');
  const sourceFolderBtn = document?.getElementById(sourceFolderBtnId);
  const destinationFolderBtn = document?.getElementById(destinationFolderBtnId);
  const sourceFolderLabel = document?.getElementById(sourceFolderLabelId);
  const destinationFolderLabel = document?.getElementById(destinationFolderLabelId);

  sourceFolderBtn?.addEventListener('click', () => {
    console.log('Select Source click');
    
    dialog.showOpenDialog( { title: 'Select Source Folder', properties: ['openDirectory']})
      .then((result: OpenDialogResult) => {
        console.log("Source Folder:", result);
        
        // TODO: set state and trigger settings panel update
        if (!result.canceled) {
          ipcRenderer.send('setSourceFolder', result.filePaths[0]);
        }
        if (!result.canceled && sourceFolderLabel) {
          sourceFolderLabel.innerText = result.filePaths[0];
        }
      });
  });
  destinationFolderBtn?.addEventListener('click', () => {
    console.log('SelectDestination click');
    
    dialog.showOpenDialog( { title: 'Select Destination Folder', properties: ['openDirectory']})
      .then((result: OpenDialogResult) => { 
        console.log("Destination Folder:", result);
        
        // TODO: set state and trigger settings panel update
        if (!result.canceled) {
          ipcRenderer.send('setDestinationFolder', result.filePaths[0]);
        }
        if (!result.canceled && destinationFolderLabel) {
          destinationFolderLabel.innerText = result.filePaths[0];
        }
      });
  });
}

attachMainPageEventHandlers();