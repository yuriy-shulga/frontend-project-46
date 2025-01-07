import genStylishFormat from './stylish.js';

export default (tree, format) => {
  switch (format) {
    case 'stylish':
      return genStylishFormat(tree);
    default:
      throw new Error(`${format} is not support`);
  }
};
