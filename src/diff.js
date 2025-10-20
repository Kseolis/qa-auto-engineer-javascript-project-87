import { readFile } from './utils/file.js';
import { parseFileContent } from './parsers.js';
import { buildDiffTree } from './diff/index.js';
import { formatDiff } from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const [content1, content2] = [readFile(filepath1), readFile(filepath2)];
  const [data1, data2] = [
    parseFileContent(filepath1, content1),
    parseFileContent(filepath2, content2)
  ];
  const diffTree = buildDiffTree(data1, data2);
  return formatDiff(diffTree, formatName);
};

export default genDiff;
