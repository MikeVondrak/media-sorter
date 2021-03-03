// const remote = require('electron').remote;
// const electronFs = remote.require('fs');
import { ipcRenderer } from "electron";
import * as fs from 'fs';
import { appActions } from "./models/actions";
import * as util from './utilities';

const htmlPath = util.getPath('/html/components');
const parser = new DOMParser();

console.log('<<<<< load-html path: ' + htmlPath);

fs.readdir(htmlPath, (err, files) => {
  if (err) {
    throw new Error(err.message);
  }
  console.log('<<<<< load-html readdir: ', files);

  files.forEach(file => {
    if (file.endsWith('.html')) {
      const filePath = htmlPath + '\\' + file;

      console.log('<<<<< loading file: ' + filePath);

      fs.readFile(filePath, (err, fileContents) => {
        
        console.log('<<<<< file contents: ', fileContents.toString());
        
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
        // let fragment = document.createDocumentFragment();     
        // fragment.appendChild(template as Node);
        // document.body.appendChild(fragment);

        // notify app process
        ipcRenderer.send(appActions.templateFromHtml, file);
      })
    }
  })
});
