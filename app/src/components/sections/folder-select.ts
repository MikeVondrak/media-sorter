import { ipcRenderer } from "electron";
import { appActions, settingsActions } from "../../models/actions";
import { OpenDialogResult } from "../../models/electron.model";

const { dialog } = require('electron').remote;

console.log('^^^^^ folder-select');

function attachMainPageEventHandlers() {
  const sourceFolderBtnId = 'Select-Source-Folder-Btn';
  const destinationFolderBtnId = 'Select-Destination-Folder-Btn';
  const sourceFolderLabelId = 'Select-Source-Folder-Label';
  const destinationFolderLabelId = 'Select-Destination-Folder-Label';

  console.log('^^^^^ folder-select running');

  const sourceFolderBtn = document?.getElementById(sourceFolderBtnId) as HTMLButtonElement;
  const destinationFolderBtn = document?.getElementById(destinationFolderBtnId) as HTMLButtonElement;
  const sourceFolderLabel = document?.getElementById(sourceFolderLabelId);
  const destinationFolderLabel = document?.getElementById(destinationFolderLabelId);

  console.log('^^^^^ folder-select attachMainPageEventHandlers');

  sourceFolderBtn?.addEventListener('click', () => {
    console.log('^^^^^ folder-select Select Source click');
    sourceFolderBtn.disabled = true;
    
    dialog.showOpenDialog( { title: 'Select Source Folder', properties: ['openDirectory']})
      .then((result: OpenDialogResult) => {

        console.log("^^^^^ folder-select Source Folder:", result);
        
        if (!result.canceled) {
          ipcRenderer.send(settingsActions.setSourceFolder, result.filePaths[0]);

          if (sourceFolderLabel) {
            sourceFolderLabel.innerText = result.filePaths[0];
          }
        }
        sourceFolderBtn.disabled = false;
      });
  });
  destinationFolderBtn?.addEventListener('click', () => {
    console.log('^^^^^ folder-select SelectDestination click');
    destinationFolderBtn.disabled = true;
    
    dialog.showOpenDialog( { title: 'Select Destination Folder', properties: ['openDirectory']})
      .then((result: OpenDialogResult) => { 

        console.log("^^^^^ folder-select Destination Folder:", result);
        
        if (!result.canceled) {
          ipcRenderer.send(settingsActions.setOutputFolder, result.filePaths[0]);
          
          if (destinationFolderLabel) {
            destinationFolderLabel.innerText = result.filePaths[0];
          }
        }
        destinationFolderBtn.disabled = false;
      });
  });
}

ipcRenderer.on(appActions.allSectionsLoaded, (event) => {
  console.log('^^^^^ folder-select allSectionsLoaded');
  attachMainPageEventHandlers();
});
