export const flattenObject = (obj: any, prefix = ''): Record<string, any> => {
  const result: Record<string, any> = {};

  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

    const value = obj[key];
    const path = prefix ? `${prefix}.${key}` : key;

    if (Array.isArray(value)) {
      value.forEach((val, index) => {
        const arrPath = `${path}[${index}]`;

        if (typeof val === 'object' && val !== null) {
          Object.assign(result, flattenObject(val, arrPath));
        } else {
          result[arrPath] = val;
        }
      });
    } else if (typeof value === 'object' && value && value !== null) {
      Object.assign(result, flattenObject(value, path));
    } else {
      result[path] = value;
    }
  }

  return result;
};
