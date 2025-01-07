import fs from 'fs';
import path from 'path';
import getObj from './src/parsers.js';
import genDiffTree from './src/genDiffTree.js';
import genFormatting from './src/formatters/index.js';

export default (filepath1, filepath2, format = 'stylish') => {
  const ext1 = path.extname(filepath1);
  const ext2 = path.extname(filepath2);
  const obj1 = getObj(fs.readFileSync(filepath1, 'utf-8'), ext1);
  const obj2 = getObj(fs.readFileSync(filepath2, 'utf-8'), ext2);

  const tree = genDiffTree(obj1, obj2);
  return genFormatting(tree, format);
};
