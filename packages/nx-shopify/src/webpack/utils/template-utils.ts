import * as fs from 'fs';

export function getTemplatesLiquidFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function (file) {
    const fileName = file;
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(getTemplatesLiquidFiles(file));
    } else {
      const partOfName = fileName.split('.');
      if (partOfName[1] == 'liquid') {
        results.push(fileName);
      }
    }
  });

  return results;
}
