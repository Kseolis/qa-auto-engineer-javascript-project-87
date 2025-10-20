import genDiff from '../src/diff.js';
import { getFixturePath } from '../src/utils/path.js';

describe('genDiff flat yaml', () => {
  test('returns exact expected diff string for flat yaml', () => {
    const filepath1 = getFixturePath('file1.yml');
    const filepath2 = getFixturePath('file2.yml');
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
    const filepath = getFixturePath('file1.yml');
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
    const filepath1 = getFixturePath('file1.yml');
    const missing = getFixturePath('no_such_file.yml');
    expect(() => genDiff(filepath1, missing)).toThrow();
  });
});
