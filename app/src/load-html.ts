const remote = require('electron').remote;
const electronFs = remote.require('fs');
import * as fs from 'fs';
import { getPath } from './utilities';

const htmlPath = getPath('/html/');

console.log('LOAD HTML: ' + htmlPath);
debugger;

fs.readdir(htmlPath, {}, (files) => {
  console.log('FS RESULT: ', files);
});
