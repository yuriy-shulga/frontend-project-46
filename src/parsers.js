import yaml from 'js-yaml';

export default (data, extension) => {
  switch (extension.toLowerCase()) {
    case '.json':
      return JSON.parse(data);
    case '.yaml':
      return yaml.load(data);
    case '.yml':
      return yaml.load(data);
    default:
      throw new Error(`${extension.slice(1)} format files are not supported!`);
  }
};
