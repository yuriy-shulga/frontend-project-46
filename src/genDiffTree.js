import _ from 'lodash';
import isObject from './utilits.js';

const genDiffTree = (obj1, obj2) => {
  const keys = _.sortBy(Object.keys({ ...obj1, ...obj2 }));

  const diff = keys.map((key) => {
    if (!Object.hasOwn(obj1, key)) {
      const value = isObject(obj2[key]) ? genDiffTree(obj2[key], obj2[key]) : obj2[key];
      return { status: 'added', key, value };
    }

    if (!Object.hasOwn(obj2, key)) {
      const value = isObject(obj1[key]) ? genDiffTree(obj1[key], obj1[key]) : obj1[key];
      return { status: 'removed', key, value };
    }

    if (obj1[key] === obj2[key] && !isObject(obj1[key])) {
      return { status: 'unchanged', key, value: obj1[key] };
    }

    if (isObject(obj1[key]) && isObject(obj2[key])) {
      return { status: 'nested', key, value: genDiffTree(obj1[key], obj2[key]) };
    }

    const value1 = isObject(obj1[key]) ? genDiffTree(obj1[key], obj1[key]) : obj1[key];
    const value2 = isObject(obj2[key]) ? genDiffTree(obj2[key], obj2[key]) : obj2[key];
    return { status: 'modified', key, value: [value1, value2] };
  });

  return diff;
};

export default genDiffTree;
