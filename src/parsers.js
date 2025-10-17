import path from 'path';
import yaml from 'js-yaml';

const getExt = (filepath) => path.extname(filepath).toLowerCase();

const isJson = (ext) => ext === '.json';
const isYaml = (ext) => ext === '.yml' || ext === '.yaml';

export const detectFormat = (filepath) => {
  const ext = getExt(filepath);
  if (isJson(ext)) return 'json';
  if (isYaml(ext)) return 'yaml';
  throw new Error(`Unsupported file extension: ${ext}`);
};

export const parseContent = (filepath, content) => {
  const format = detectFormat(filepath);
  if (format === 'json') {
    return JSON.parse(content);
  }
  if (format === 'yaml') {
    return yaml.load(content);
  }
  throw new Error('Unsupported format');
};

export default parseContent;
