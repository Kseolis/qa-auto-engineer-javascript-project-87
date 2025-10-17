import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/diff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const buildFixturePath = (relative) => path.join(__dirname, '..', '__fixtures__', relative);

describe('genDiff flat yaml', () => {
  test('returns exact expected diff string for flat yaml', () => {
    const filepath1 = buildFixturePath('file1.yml');
    const filepath2 = buildFixturePath('file2.yml');
    const expected = [
      '{',
      '  - follow: false',
      '    host: hexlet.io',
      '  - proxy: 123.234.53.22',
      '  - timeout: 50',
      '  + timeout: 20',
      '  + verbose: true',
      '}',
    ].join('\n');

    const result = genDiff(filepath1, filepath2);
    expect(result).toBe(expected);
  });

  test('handles identical yaml files', () => {
    const filepath = buildFixturePath('file1.yml');
    const expected = [
      '{',
      '  - follow: false',
      '    host: hexlet.io',
      '  - proxy: 123.234.53.22',
      '  - timeout: 50',
      '  + timeout: 20',
      '  + verbose: true',
      '}',
    ].join('\n');
    // identical comparison should match json pair expected output if same fixtures are used
    const result = genDiff(filepath, filepath);
    expect(result).toBe(['{',
      '    follow: false',
      '    host: hexlet.io',
      '    proxy: 123.234.53.22',
      '    timeout: 50',
      '}',
    ].join('\n'));
  });

  test('throws when yaml file missing', () => {
    const filepath1 = buildFixturePath('file1.yml');
    const missing = buildFixturePath('no_such_file.yml');
    expect(() => genDiff(filepath1, missing)).toThrow();
  });
});


