import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import getObj from './src/parsers.js';

export default (filepath1, filepath2) => {
  const ext1 = path.extname(filepath1);
  const ext2 = path.extname(filepath2);
  const obj1 = getObj(fs.readFileSync(filepath1, 'utf-8'), ext1);
  const obj2 = getObj(fs.readFileSync(filepath2, 'utf-8'), ext2);

  const keys = _.sortBy(Object.keys({ ...obj1, ...obj2 }));
  const diff = keys.map((key) => {
    if (!Object.hasOwn(obj1, key)) {
      return `  + ${key}: ${obj2[key]}`;
    }

    if (!Object.hasOwn(obj2, key)) {
      return `  - ${key}: ${obj1[key]}`;
    }

    if (obj1[key] !== obj2[key]) {
      return `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`;
    }

    return `    ${key}: ${obj1[key]}`;
  });

  return `{\n${diff.join('\n')}\n}`;
};
