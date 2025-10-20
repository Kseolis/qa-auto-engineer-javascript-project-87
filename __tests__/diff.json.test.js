import fs from 'fs';
import genDiff from '../src/diff.js';
import { getFixturePath } from '../src/utils/path.js';

describe('genDiff flat json', () => {
  test('returns exact expected diff string', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
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

  test('does not mutate parsed objects', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    const original1 = JSON.parse(fs.readFileSync(filepath1, 'utf-8'));
    const original2 = JSON.parse(fs.readFileSync(filepath2, 'utf-8'));

    genDiff(filepath1, filepath2);

    const after1 = JSON.parse(fs.readFileSync(filepath1, 'utf-8'));
    const after2 = JSON.parse(fs.readFileSync(filepath2, 'utf-8'));

    expect(after1).toEqual(original1);
    expect(after2).toEqual(original2);
  });

  test('throws when file does not exist', () => {
    const filepath1 = getFixturePath('file1.json');
    const missing = getFixturePath('no_such_file.json');
    expect(() => genDiff(filepath1, missing)).toThrow();
  });
});


