// Built-in FS Module for file system I/O
const fs = require('fs');
const path = require('path');

console.log('HexToRgb.js\n');

// Get file to operate on from passed in arg
let inFile = process.argv[2] ? process.argv[2] : '';
let filePath = '';

if (!inFile) {
  console.log('ERROR No file argument provided');
  return;
} else {
  console.log('inFile: ' + inFile);
  filePath = path.resolve(__dirname, inFile);
  if (!filePath) {
    console.log('ERROR Could not resolve file path for: ' + inFile);
  }
}
console.log('Operating on: ' + filePath);

fs.readFile(filePath, 'utf8', (err, data /*Buffer*/) => {
  if (err) {
    console.log('ERROR Failed reading file: ' + filePath + '\n' + err.stack);
    return;
  }
  //console.log('Data:\n' + data);
  let dataSplit = data.split(/\s+/); // \s = "spaces" including newline, + = 1 or more
  let varName = '';
  let colors = [];
  let r, g, b;
  dataSplit.forEach((data, index) => {
    console.log('\ndataSplit[' + index + ']: ' + data);
    if ((index % 2) === 0) {      
      varName = data.substr(0, data.length-1); // remove ':'
      varName = varName + '_rgb:'
      console.log('varName: ' + varName);
    } else {
      let color = data.substr(1, data.length-2); // remove '#' and ';'
      if (color.length === 3) {
        r = '0x' + color[0] + color[0];
        g = '0x' + color[1] + color[1];
        b = '0x' + color[2] + color[2];
      } else if (color.length === 6) {
        r = '0x' + color[0] + color[1];
        g = '0x' + color[2] + color[3];
        b = '0x' + color[4] + color[5];
      } else {
        console.log('ERROR Invalid color value: ' + color + ' from ' + data);
        return;
      }
      let colorRgb = varName + ' rgb(' + +r + ', ' + +g + ', ' + +b + ');'; // cast r, g, b to number
      colors.push(colorRgb);
      console.log('colorRgb[' + index + ']: ' + colorRgb);
    }
  });

  writeColorsRgb(colors);
  
  function writeColorsRgb(colors) {
    // write converted values to new file
    let newFile = filePath.substr(0, filePath.length - 5); // remove '.scss'
    newFile += '_rgb.scss';
    console.log('new file: ' + newFile);
    let writer = fs.createWriteStream(newFile);
    writer.write('// !! THIS IS A GENERATED FILE DO NOT MAKE CHANGES HERE !!\n\n');
    colors.forEach(color => {
      writer.write(color + '\n');
    });
    writer.close();
  }
});
