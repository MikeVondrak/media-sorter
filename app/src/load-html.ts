const remote = require('electron').remote;
const electronFs = remote.require('fs');
import * as fs from 'fs';
import { getPath } from './utilities';

const htmlPath = getPath('/html/components');
const parser = new DOMParser();

console.log('LOAD HTML: ' + htmlPath);

fs.readdir(htmlPath, (err, files) => {
  if (err) {
    throw new Error(err.message);
  }
  console.log('FS RESULT: ', files);

  files.forEach(file => {
    if (file.endsWith('.html')) {
      const filePath = htmlPath + '\\' + file;
      debugger;
      console.log('LOADING: ' + filePath);
      fs.readFile(filePath, (err, fileContents) => {
        if (err) {
          throw new Error(err.message);
        }
        const html = parser.parseFromString(fileContents.toString(), 'text/html');
        const templateContents = html.querySelector('body')?.childNodes; // parsed html is wrapped in html and body elements, get the children of body to insert into template container
        if (!templateContents) {
          throw new Error('Unable to parse template: ' + file);
        }
        const frag = document.createDocumentFragment();
        templateContents.forEach(node => {
          frag.appendChild(node);
        });
        document.body.appendChild(frag);
        debugger;
      })
    }
  })
});
