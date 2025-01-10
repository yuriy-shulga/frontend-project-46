const operators = {
  added: '+',
  removed: '-',
  nested: ' ',
  unchanged: ' ',
  modified: '-+',
};

const indent = '    ';
const genIndent = (count) => indent.repeat(count);

const genStylishFormat = (tree) => {
  const iter = (node, count) => {
    const curIndent = genIndent(count);
    const newTree = node.map((el) => {
      const { status, key, value } = el;
      if (status === 'modified') {
        const [rmValue, addValue] = value;
        const normalizeValue1 = Array.isArray(rmValue) ? iter(rmValue, count + 1) : rmValue;
        const normalizeValue2 = Array.isArray(addValue) ? iter(addValue, count + 1) : addValue;
        const diff1 = `${curIndent}  ${operators[status][0]} ${key}: ${normalizeValue1}`;
        const diff2 = `${curIndent}  ${operators[status][1]} ${key}: ${normalizeValue2}`;
        return `${diff1}\n${diff2}`;
      }

      const newValue = Array.isArray(value) ? iter(value, count + 1) : value;
      return `${curIndent}  ${operators[status]} ${key}: ${newValue}`;
    });

    return `{\n${newTree.join('\n')}\n${curIndent}}`;
  };

  return iter(tree, 0);
};

export default genStylishFormat;
