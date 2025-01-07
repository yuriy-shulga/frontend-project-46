const operators = {
  added: '+',
  removed: '-',
  nested: ' ',
  unchanged: ' ',
  modified: '-+',
};

const genStylishFormat = (tree) => {
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

export default genStylishFormat;
