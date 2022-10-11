/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
import fs from 'fs';
import path from 'path';

const util = {
  getAllFiles(app: any, dirPath: any, filter: any = [], arrayOfFiles: any = []) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];
    files.forEach(function (file: any) {
      if (fs.statSync(`${dirPath}/${file}`).isDirectory()) {
        arrayOfFiles = util.getAllFiles(
          app,
          `${dirPath}/${file}`,
          filter,
          arrayOfFiles
        );
      } else if (filter.length > 0) {
        filter.map((item: any) => {
          const targetFile = file.split('.');
          const targetFilter = item.split('.');
          if (
            targetFilter[targetFilter.length - 2] ===
            targetFile[targetFile.length - 2] &&
            targetFilter[targetFilter.length - 1] ===
            targetFile[targetFile.length - 1]
          ) {
            arrayOfFiles.push(path.join(dirPath, '/', file));
          }
          return true;
        });
      }
    });

    return arrayOfFiles;
  },
};

export default util;
