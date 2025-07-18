export const flattenObject = (obj: any, prefix = ''): Record<string, any> => {
  const result: Record<string, any> = {};

  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

    const value = obj[key];
    const path = prefix ? `${prefix}.${key}` : key;

    if (Array.isArray(value)) {
      value.forEach((val, ind) => {
        const arrPath = `${path}[${ind}]`;
        if (typeof val === 'object' && val !== null) {
          Object.assign(result, flattenObject(val, arrPath));
        } else {
          result[arrPath] = val;
        }
      });
    }else if(value !== null && typeof value === 'object') {
        Object.assign(result, flattenObject(value, path));
    } else {
      result[path] = value;
    }
  }

  return result;
};
