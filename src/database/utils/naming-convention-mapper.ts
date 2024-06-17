// utils/namingConventionMapper.ts

export const snakeToCamelCase = (str: string): string => {
  return str.replace(/_([a-z])/g, (group) => group.toUpperCase());
};

export const camelCaseToSnake = (str: string): string => {
  return str.replace(/([A-Z])/g, (group) => `_${group.toLowerCase()}`);
};

const transformKeys = (obj: any, transformFn: (key: string) => string) => {
  if (!obj) return obj; // Safeguard against undefined or null
  return Object.keys(obj).reduce((acc, key) => {
    const newKey = transformFn(key);
    acc[newKey] = obj[key];
    return acc;
  }, {});
};

export const transformObjectKeys = (
  obj: any,
  transformFn: (key: string) => string,
) => {
  if (!obj) return obj; // Safeguard against undefined or null
  if (Array.isArray(obj)) {
    return obj.map((item) => transformKeys(item, transformFn));
  }
  return transformKeys(obj, transformFn);
};
