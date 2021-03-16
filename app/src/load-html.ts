// const remote = require('electron').remote;
// const electronFs = remote.require('fs');
import { ipcRenderer } from "electron";
import * as fs from 'fs';
import { appActions, loadHtmlActions } from "./models/actions";
import * as util from './utilities';

const htmlPath = util.getPath('/html/components');
const parser = new DOMParser();

console.log('<<<<< load-html path: ' + htmlPath);

/**
 * Checks htmlPath and sub-folder named 'sections' for .html files and renders 
 * the markup within the file at the end of <body> element
 * - reports the addition of the template to main process with filename that was loaded
 * 
 * @param htmlPath - path to check for .html files
 * @param complete - used to prevent sending final all-loaded action when parsing sub-folder
 */
function parseFolderForHtml(htmlPath: string, complete: boolean = true) {
  // check each folder/file entry for .html extension or sub-folder to parse
  fs.readdir(htmlPath, (err, files) => {
    if (err) {
      throw new Error(err.message);
    }
    console.log('<<<<< load-html readdir: ', files);

    const numFiles = files.length;

    files.forEach((file, idx) => {
      // parse sections folder for templates
      if (file === 'sections') {
        const subPath = htmlPath + '/' + file;
        console.log('<<<<< parsing sub-folder: ' + subPath);
        parseFolderForHtml(subPath, false);
      }
      else if (file.endsWith('.html')) {
        const filePath = htmlPath + '\\' + file;

        console.log('<<<<< loading file: ' + filePath);

        fs.readFile(filePath, (err, fileContents) => {
          
          // console.log('<<<<< file contents: ', fileContents.toString());
          
          if (err) {
            throw new Error(err.message);
          }
          // NOTE: parsed html is wrapped in html and body elements?
          const html = parser.parseFromString(fileContents.toString(), 'text/html');
          const template = html.querySelector('template');
          
          if (!html || !template) {
            throw new Error('Unable to parse template: ' + file);
          }      
          util.appendNode(template);
          console.log('<<<<< file loaded: ' + file);

          // notify app process
          ipcRenderer.send(loadHtmlActions.templateFromHtml, file);
          if (idx + 1 === numFiles && complete) {
            console.log('<<<<< all files loaded: ' + numFiles);
            ipcRenderer.send(loadHtmlActions.templateFromHtmlDone, true);
          }
        });
      }
    });
  });
}

parseFolderForHtml(htmlPath);
