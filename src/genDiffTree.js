import _ from 'lodash';

const genDiffTree = (data1, data2) => {
  const keys = _.sortBy(Object.keys({ ...data1, ...data2 }));
  const diff = keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (!Object.hasOwn(data2, key)) {
      return { key, status: 'removed', value: value1 };
    }

    if (!Object.hasOwn(data1, key)) {
      return { key, status: 'added', value: value2 };
    }

    if (_.isEqual(value1, value2)) {
      return { key, status: 'unchanged', value: value1 };
    }

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { key, status: 'nested', children: genDiffTree(value1, value2) };
    }

    return { key, status: 'modified', value: { value1, value2 } };
  });

  return diff;
};

export default genDiffTree;
