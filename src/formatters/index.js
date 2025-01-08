import genStylishFormat from './stylish.js';
import genPlainFormat from './plain.js';

export default (tree, format) => {
  switch (format) {
    case 'stylish':
      return genStylishFormat(tree);
    case 'plain':
      return genPlainFormat(tree);
    default:
      throw new Error(`${format} format is not support`);
  }
};
