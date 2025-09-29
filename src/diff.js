import fs from 'fs';
import path from 'path';

const parseByExt = (filepath, content) => {
  const ext = path.extname(filepath).toLowerCase();
  if (ext === '.json') {
    return JSON.parse(content);
  }
  throw new Error(`Unsupported file extension: ${ext}`);
};

const readData = (filepath) => {
  const content = fs.readFileSync(filepath, 'utf-8');
  return parseByExt(filepath, content);
};

const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

const stringifyValue = (value) => {
  if (isObject(value)) {
    return '[complex value]';
  }
  return String(value);
};

const buildDiffLines = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const allKeys = Array.from(new Set([...keys1, ...keys2])).sort((a, b) => a.localeCompare(b));

  const lines = allKeys.flatMap((key) => {
    const has1 = Object.prototype.hasOwnProperty.call(data1, key);
    const has2 = Object.prototype.hasOwnProperty.call(data2, key);
    const val1 = has1 ? data1[key] : undefined;
    const val2 = has2 ? data2[key] : undefined;

    if (has1 && has2 && Object.is(val1, val2)) {
      return [`    ${key}: ${stringifyValue(val1)}`];
    }
    if (has1 && has2 && !Object.is(val1, val2)) {
      return [
        `  - ${key}: ${stringifyValue(val1)}`,
        `  + ${key}: ${stringifyValue(val2)}`,
      ];
    }
    if (has1 && !has2) {
      return [`  - ${key}: ${stringifyValue(val1)}`];
    }
    if (!has1 && has2) {
      return [`  + ${key}: ${stringifyValue(val2)}`];
    }
    return [];
  });

  return ['{', ...lines, '}'].join('\n');
};

const genDiff = (filepath1, filepath2) => {
  const data1 = readData(filepath1);
  const data2 = readData(filepath2);
  return buildDiffLines(data1, data2);
};

export default genDiff;


