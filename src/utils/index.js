import { promisify } from "util";
import ncp from "ncp";
import fs from 'fs';
import path from 'path';

const copy = promisify(ncp);

/**
 * 复制文件
 * @returns {Promise<*>}
 * @param from
 * @param to
 */
export async function copyFile(from, to) {
  return copy(from, to, {
    clobber: false, // 同名文件不覆盖
  });
}

export function getFileDirs(pathName) {
  return new Promise((resolve) => {
    fs.readdir(pathName, function (err, files) {
      const dirs = [];
      (function iterator(i) {
        if (i === files.length) {
          resolve(dirs);
          return;
        }
        fs.stat(path.join(pathName, files[i]), function () {
          dirs.push(files[i]);
          iterator(i + 1);
        });
      })(0);
    })
  })
}
