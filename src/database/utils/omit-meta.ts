export default function omit<
  T extends Record<string, unknown>,
  K extends keyof T,
>(obj: T, keys: K[]): Omit<T, K> {
  const result = {} as Omit<T, K>;
  Object.keys(obj).forEach((key) => {
    if (!keys.includes(key as K)) {
      // eslint-disable-next-line security/detect-object-injection
      result[key] = obj[key];
    }
  });
  return result;
}
