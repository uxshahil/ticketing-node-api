const convertKeysToCamelCase = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map((item) => convertKeysToCamelCase(item));
  }
  if (typeof obj === 'object' && obj !== null) {
    return Object.keys(obj).reduce((accumulator, key) => {
      const camelKey = key.replace(/([-_])(\w)/g, (_, match, char) =>
        char.toUpperCase(),
      );
      accumulator[camelKey] = obj[key];
      return accumulator;
    }, {});
  }

  return obj;
};

export default convertKeysToCamelCase;
