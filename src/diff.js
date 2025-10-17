import fs from 'fs';
import parseContent from './parsers.js';
import stylish from './formatters/stylish.js';

const readData = (filepath) => {
  const content = fs.readFileSync(filepath, 'utf-8');
  return parseContent(filepath, content);
};

const buildDiffTree = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const allKeys = Array.from(new Set([...keys1, ...keys2])).sort((a, b) => a.localeCompare(b));
  const tree = allKeys.map((key) => {
    const has1 = Object.prototype.hasOwnProperty.call(data1, key);
    const has2 = Object.prototype.hasOwnProperty.call(data2, key);
    const val1 = data1[key];
    const val2 = data2[key];

    if (has1 && has2 && Object.is(val1, val2)) {
      return { type: 'unchanged', key, value: val1 };
    }
    if (has1 && has2 && !Object.is(val1, val2)) {
      return { type: 'updated', key, oldValue: val1, newValue: val2 };
    }
    if (has1 && !has2) {
      return { type: 'removed', key, value: val1 };
    }
    if (!has1 && has2) {
      return { type: 'added', key, value: val2 };
    }
    return null;
  }).filter(Boolean);
  return tree;
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = readData(filepath1);
  const data2 = readData(filepath2);
  const diffTree = buildDiffTree(data1, data2);
  if (format === 'stylish') {
    return stylish(diffTree);
  }
  throw new Error(`Unknown format: ${format}`);
};

export default genDiff;


