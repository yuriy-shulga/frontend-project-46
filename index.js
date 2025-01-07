import fs from 'fs';
import path from 'path';
import getObj from './src/parsers.js';
import genDiffTree from './src/genDiffTree.js';

const operators = {
  added: '+',
  removed: '-',
  nested: ' ',
  unchanged: ' ',
  modified: '-+',
};

const genFormatting = (tree) => {
  const separator = ' ';
  const iter = (node, count) => {
    const newTree = node.map((el) => {
      const { status, key, value } = el;
      if (status === 'modified') {
        const normalizeValue1 = Array.isArray(value[0]) ? iter(value[0], count + 4) : value[0];
        const normalizeValue2 = Array.isArray(value[1]) ? iter(value[1], count + 4) : value[1];
        const diff1 = `${separator.repeat(count + 2)}${operators[status][0]} ${key}: ${normalizeValue1}`;
        const diff2 = `${separator.repeat(count + 2)}${operators[status][1]} ${key}: ${normalizeValue2}`;
        return `${diff1}\n${diff2}`;
      }

      const newValue = Array.isArray(value) ? iter(value, count + 4) : value;
      return `${separator.repeat(count + 2)}${operators[status]} ${key}: ${newValue}`;
    });

    return `{\n${newTree.join('\n')}\n${separator.repeat(count)}}`;
  };

  return iter(tree, 0);
};

export default (filepath1, filepath2, format = 'stylish') => {
  const ext1 = path.extname(filepath1);
  const ext2 = path.extname(filepath2);
  const obj1 = getObj(fs.readFileSync(filepath1, 'utf-8'), ext1);
  const obj2 = getObj(fs.readFileSync(filepath2, 'utf-8'), ext2);

  const tree = genDiffTree(obj1, obj2);
  return genFormatting(tree, format);
};
