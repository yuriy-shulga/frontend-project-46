const getNormalizeValue = (value) => {
  if (typeof (value) === 'string') {
    return `'${value}'`;
  }

  if (Array.isArray(value)) {
    return '[complex value]';
  }

  return value;
};

export default (tree) => {
  const diff = tree.flatMap((node) => {
    const iter = (el, path) => {
      const { status, value } = el;
      if (status === 'removed') {
        return `Property '${path}' was removed`;
      }

      if (status === 'added') {
        return `Property '${path}' was added with value: ${getNormalizeValue(value)}`;
      }

      if (status === 'modified') {
        return `Property '${path}' was updated. From ${getNormalizeValue(value[0])} to ${getNormalizeValue(value[1])}`;
      }

      if (status === 'nested') {
        return value.flatMap((curValue) => iter(curValue, `${path}.${curValue.key}`));
      }

      return [];
    };

    return iter(node, node.key);
  });

  return diff.join('\n', '');
};
