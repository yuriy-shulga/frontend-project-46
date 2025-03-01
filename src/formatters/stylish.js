import isObject from '../utilits.js';
>>>>>>> 072fe63 (Refactor (formatters): improve tree transformation and formatting logic)

const operators = {
  added: '+',
  removed: '-',
  nested: ' ',
  unchanged: ' ',
  modified: '-+',
};

const baseIndent = '    ';
const createIndent = (count) => baseIndent.repeat(count);

const stylishStringify = (tree, depth) => `{\n${tree.map((node) => {
  const [status, key, value] = node;

  if (status === 'modified') {
    const [[removedStatus, previousKey, oldValue], [addedStatus, currentKey, newValue]] = value;

    const formattedOldValue = !Array.isArray(oldValue) ? oldValue : `${stylishStringify(oldValue, depth + 1)}`;
    const formattedNewValue = !Array.isArray(newValue) ? newValue : `${stylishStringify(newValue, depth + 1)}`;

    return `${createIndent(depth)}  ${operators[removedStatus]} ${previousKey}: ${formattedOldValue}\n${createIndent(depth)}  ${operators[addedStatus]} ${currentKey}: ${formattedNewValue}`;
  }

  if (Array.isArray(value)) {
    return `${createIndent(depth)}  ${operators[status]} ${key}: ${stylishStringify(value, depth + 1)}`;
  }

  return `${createIndent(depth)}  ${operators[status]} ${key}: ${value}`;
}).join('\n')}\n${createIndent(depth)}}`;

const isPrimitive = (data) => {
  if (Array.isArray(data)) {
    return false;
  }

  if (isObject(data)) {
    return false;
  }

  return true;
};

const transformTree = (tree) => {
  if (isPrimitive(tree)) {
    return tree;
  }

  if (isObject(tree)) {
    const {
      status, key, value, children,
    } = tree;
    if (children) {
      return [status, key, children.map(transformTree)];
    }
    return [status, key, transformTree(value)];
  }

  return (tree.map(transformTree));
};

const genStylishFormat = (tree) => {
  const newTree = transformTree(tree);
  return stylishStringify(newTree, 0);
};

export default genStylishFormat;
