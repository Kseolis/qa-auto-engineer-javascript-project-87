import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/diff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const buildFixturePath = (relative) => path.join(__dirname, '..', '__fixtures__', relative);

describe('genDiff plain format', () => {
  describe('JSON files', () => {
    test('returns expected plain diff for JSON files with all change types', () => {
      const filepath1 = buildFixturePath('file1.json');
      const filepath2 = buildFixturePath('file2.json');
      const expected = [
        "Property 'follow' was removed",
        "Property 'proxy' was removed",
        "Property 'timeout' was updated. From 50 to 20",
        "Property 'verbose' was added with value: true"
      ].join('\n');

      const result = genDiff(filepath1, filepath2, 'plain');
      expect(result).toBe(expected);
    });

    test('handles identical JSON files', () => {
      const filepath = buildFixturePath('file1.json');
      const result = genDiff(filepath, filepath, 'plain');
      expect(result).toBe('');
    });

    test('does not mutate parsed JSON objects', () => {
      const filepath1 = buildFixturePath('file1.json');
      const filepath2 = buildFixturePath('file2.json');
      const original1 = JSON.parse(fs.readFileSync(filepath1, 'utf-8'));
      const original2 = JSON.parse(fs.readFileSync(filepath2, 'utf-8'));

      genDiff(filepath1, filepath2, 'plain');

      const after1 = JSON.parse(fs.readFileSync(filepath1, 'utf-8'));
      const after2 = JSON.parse(fs.readFileSync(filepath2, 'utf-8'));

      expect(after1).toEqual(original1);
      expect(after2).toEqual(original2);
    });

    test('throws when JSON file does not exist', () => {
      const filepath1 = buildFixturePath('file1.json');
      const missing = buildFixturePath('no_such_file.json');
      expect(() => genDiff(filepath1, missing, 'plain')).toThrow();
    });
  });

  describe('YAML files', () => {
    test('returns expected plain diff for YAML files with all change types', () => {
      const filepath1 = buildFixturePath('file1.yml');
      const filepath2 = buildFixturePath('file2.yml');
      const expected = [
        "Property 'follow' was removed",
        "Property 'proxy' was removed",
        "Property 'timeout' was updated. From 50 to 20",
        "Property 'verbose' was added with value: true"
      ].join('\n');

      const result = genDiff(filepath1, filepath2, 'plain');
      expect(result).toBe(expected);
    });

    test('handles identical YAML files', () => {
      const filepath = buildFixturePath('file1.yml');
      const result = genDiff(filepath, filepath, 'plain');
      expect(result).toBe('');
    });

    test('throws when YAML file does not exist', () => {
      const filepath1 = buildFixturePath('file1.yml');
      const missing = buildFixturePath('no_such_file.yml');
      expect(() => genDiff(filepath1, missing, 'plain')).toThrow();
    });
  });

  describe('Plain formatter edge cases', () => {
    test('handles string values correctly', () => {
      const data1 = { name: 'John' };
      const data2 = { name: 'Jane' };
      
      // Create temporary files for testing
      const tempFile1 = path.join(__dirname, 'temp1.json');
      const tempFile2 = path.join(__dirname, 'temp2.json');
      
      fs.writeFileSync(tempFile1, JSON.stringify(data1, null, 2));
      fs.writeFileSync(tempFile2, JSON.stringify(data2, null, 2));
      
      const result = genDiff(tempFile1, tempFile2, 'plain');
      const expected = "Property 'name' was updated. From 'John' to 'Jane'";
      
      expect(result).toBe(expected);
      
      // Clean up
      fs.unlinkSync(tempFile1);
      fs.unlinkSync(tempFile2);
    });

    test('handles numeric values correctly', () => {
      const data1 = { count: 10 };
      const data2 = { count: 20 };
      
      const tempFile1 = path.join(__dirname, 'temp1.json');
      const tempFile2 = path.join(__dirname, 'temp2.json');
      
      fs.writeFileSync(tempFile1, JSON.stringify(data1, null, 2));
      fs.writeFileSync(tempFile2, JSON.stringify(data2, null, 2));
      
      const result = genDiff(tempFile1, tempFile2, 'plain');
      const expected = "Property 'count' was updated. From 10 to 20";
      
      expect(result).toBe(expected);
      
      // Clean up
      fs.unlinkSync(tempFile1);
      fs.unlinkSync(tempFile2);
    });

    test('handles boolean values correctly', () => {
      const data1 = { enabled: false };
      const data2 = { enabled: true };
      
      const tempFile1 = path.join(__dirname, 'temp1.json');
      const tempFile2 = path.join(__dirname, 'temp2.json');
      
      fs.writeFileSync(tempFile1, JSON.stringify(data1, null, 2));
      fs.writeFileSync(tempFile2, JSON.stringify(data2, null, 2));
      
      const result = genDiff(tempFile1, tempFile2, 'plain');
      const expected = "Property 'enabled' was updated. From false to true";
      
      expect(result).toBe(expected);
      
      // Clean up
      fs.unlinkSync(tempFile1);
      fs.unlinkSync(tempFile2);
    });

    test('handles object values as complex values', () => {
      const data1 = { config: { host: 'localhost' } };
      const data2 = { config: { host: 'example.com' } };
      
      const tempFile1 = path.join(__dirname, 'temp1.json');
      const tempFile2 = path.join(__dirname, 'temp2.json');
      
      fs.writeFileSync(tempFile1, JSON.stringify(data1, null, 2));
      fs.writeFileSync(tempFile2, JSON.stringify(data2, null, 2));
      
      const result = genDiff(tempFile1, tempFile2, 'plain');
      const expected = "Property 'config' was updated. From [complex value] to [complex value]";
      
      expect(result).toBe(expected);
      
      // Clean up
      fs.unlinkSync(tempFile1);
      fs.unlinkSync(tempFile2);
    });

    test('handles only added properties', () => {
      const data1 = {};
      const data2 = { newProp: 'value' };
      
      const tempFile1 = path.join(__dirname, 'temp1.json');
      const tempFile2 = path.join(__dirname, 'temp2.json');
      
      fs.writeFileSync(tempFile1, JSON.stringify(data1, null, 2));
      fs.writeFileSync(tempFile2, JSON.stringify(data2, null, 2));
      
      const result = genDiff(tempFile1, tempFile2, 'plain');
      const expected = "Property 'newProp' was added with value: 'value'";
      
      expect(result).toBe(expected);
      
      // Clean up
      fs.unlinkSync(tempFile1);
      fs.unlinkSync(tempFile2);
    });

    test('handles only removed properties', () => {
      const data1 = { oldProp: 'value' };
      const data2 = {};
      
      const tempFile1 = path.join(__dirname, 'temp1.json');
      const tempFile2 = path.join(__dirname, 'temp2.json');
      
      fs.writeFileSync(tempFile1, JSON.stringify(data1, null, 2));
      fs.writeFileSync(tempFile2, JSON.stringify(data2, null, 2));
      
      const result = genDiff(tempFile1, tempFile2, 'plain');
      const expected = "Property 'oldProp' was removed";
      
      expect(result).toBe(expected);
      
      // Clean up
      fs.unlinkSync(tempFile1);
      fs.unlinkSync(tempFile2);
    });
  });
});
