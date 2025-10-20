import yaml from 'js-yaml';
import { getFileExtension, isJsonExtension, isYamlExtension } from './utils/path.js';

export const detectFormat = (filepath) => {
  const ext = getFileExtension(filepath);
  if (isJsonExtension(ext)) return 'json';
  if (isYamlExtension(ext)) return 'yaml';
  throw new Error(`Unsupported file extension: ${ext}`);
};

export const parseContent = (content, format) => {
  try {
    const parsers = {
      json: () => JSON.parse(content),
      yaml: () => yaml.load(content)
    };
    
    const parser = parsers[format];
    if (!parser) {
      throw new Error(`Unsupported format: ${format}`);
    }
    
    return parser();
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(`Invalid ${format} syntax: ${error.message}`);
    }
    if (error.message.includes('YAMLException')) {
      throw new Error(`Invalid YAML syntax: ${error.message}`);
    }
    throw new Error(`Failed to parse ${format}: ${error.message}`);
  }
};

export const parseFileContent = (filepath, content) => {
  const format = detectFormat(filepath);
  return parseContent(content, format);
};

export default parseFileContent;
