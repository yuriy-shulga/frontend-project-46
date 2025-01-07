import yaml from 'js-yaml';

export default (data, extension) => {
  switch (extension.toLowerCase()) {
    case '.json':
      return JSON.parse(data);
    case '.yaml':
    case '.yml':
      return yaml.load(data);
    default:
      throw new Error(`${extension.slice(1)} file format is not supported!`);
  }
};
