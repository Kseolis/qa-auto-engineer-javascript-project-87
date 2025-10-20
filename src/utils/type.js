export const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

export const isString = (value) => typeof value === 'string';

export const isNumber = (value) => typeof value === 'number';

export const isBoolean = (value) => typeof value === 'boolean';

export const isNull = (value) => value === null;

export const isUndefined = (value) => value === undefined;
