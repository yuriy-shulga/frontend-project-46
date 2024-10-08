export default (data, extension) => {
  switch (extension.toLowerCase()) {
    case '.json':
      return JSON.parse(data);
    default:
      throw new Error(`${extension.slice(1)} format files are not supported!`);
  }
};
