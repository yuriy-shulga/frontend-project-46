import fs from 'fs';
import path from 'path';
import parseData from './parsers.js';
import genDiffTree from './genDiffTree.js';
import genFormat from './formatters/index.js';

export default (filepath1, filepath2, format = 'stylish') => {
  const ext1 = path.extname(filepath1);
  const ext2 = path.extname(filepath2);
  const obj1 = parseData(fs.readFileSync(filepath1, 'utf-8'), ext1);
  const obj2 = parseData(fs.readFileSync(filepath2, 'utf-8'), ext2);

  const tree = genDiffTree(obj1, obj2);
  return genFormat(tree, format);
};
