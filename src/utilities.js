const isObject = (value) => {
  if (Array.isArray(value)) {
    return false;
  }

  if (value === null) {
    return false;
  }

  return typeof value === 'object';
};

export default isObject;
