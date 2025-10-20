import path from 'path';
import { fileURLToPath } from 'url';

export const getFileExtension = (filepath) => path.extname(filepath).toLowerCase();

export const isJsonExtension = (ext) => ext === '.json';

export const isYamlExtension = (ext) => ext === '.yml' || ext === '.yaml';

export const resolvePath = (...segments) => path.resolve(...segments);

export const joinPath = (...segments) => path.join(...segments);

export const getFixturePath = (relative) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return path.join(__dirname, '..', '..', '__fixtures__', relative);
};