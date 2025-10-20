import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/diff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const buildFixturePath = (relative) => path.join(__dirname, '..', '__fixtures__', relative);

describe('genDiff json format', () => {
  describe('JSON files', () => {
    test('returns expected json diff for JSON files with all change types', () => {
      const filepath1 = buildFixturePath('file1.json');
      const filepath2 = buildFixturePath('file2.json');
      
      const result = genDiff(filepath1, filepath2, 'json');
      const parsed = JSON.parse(result);
      
      // Проверяем, что результат является валидным JSON
      expect(() => JSON.parse(result)).not.toThrow();
      
      // Проверяем новую структуру результата
      expect(parsed).toHaveProperty('summary');
      expect(parsed).toHaveProperty('changes');
      
      // Проверяем summary
      expect(parsed.summary).toEqual({
        total: 5,
        added: 1,
        removed: 2,
        updated: 1,
        unchanged: 1
      });
      
      // Проверяем структуру changes
      expect(parsed.changes).toHaveProperty('added');
      expect(parsed.changes).toHaveProperty('removed');
      expect(parsed.changes).toHaveProperty('updated');
      expect(parsed.changes).toHaveProperty('unchanged');
      
      // Проверяем конкретные изменения
      expect(parsed.changes.removed).toEqual({
        follow: false,
        proxy: '123.234.53.22'
      });
      
      expect(parsed.changes.unchanged).toEqual({
        host: 'hexlet.io'
      });
      
      expect(parsed.changes.updated).toEqual({
        timeout: {
          oldValue: 50,
          newValue: 20
        }
      });
      
      expect(parsed.changes.added).toEqual({
        verbose: true
      });
    });

    test('handles identical JSON files', () => {
      const filepath = buildFixturePath('file1.json');
      const result = genDiff(filepath, filepath, 'json');
      const parsed = JSON.parse(result);
      
      // Проверяем новую структуру
      expect(parsed).toHaveProperty('summary');
      expect(parsed).toHaveProperty('changes');
      
      // Для идентичных файлов все элементы должны быть в unchanged
      expect(parsed.summary.added).toBe(0);
      expect(parsed.summary.removed).toBe(0);
      expect(parsed.summary.updated).toBe(0);
      expect(parsed.summary.unchanged).toBeGreaterThan(0);
      
      // Проверяем, что все изменения находятся в unchanged
      expect(Object.keys(parsed.changes.unchanged).length).toBeGreaterThan(0);
      expect(Object.keys(parsed.changes.added)).toHaveLength(0);
      expect(Object.keys(parsed.changes.removed)).toHaveLength(0);
      expect(Object.keys(parsed.changes.updated)).toHaveLength(0);
      
      // Проверяем конкретное значение
      expect(parsed.changes.unchanged.host).toBe('hexlet.io');
    });

    test('does not mutate parsed JSON objects', () => {
      const filepath1 = buildFixturePath('file1.json');
      const filepath2 = buildFixturePath('file2.json');
      const original1 = JSON.parse(fs.readFileSync(filepath1, 'utf-8'));
      const original2 = JSON.parse(fs.readFileSync(filepath2, 'utf-8'));

      genDiff(filepath1, filepath2, 'json');

      const after1 = JSON.parse(fs.readFileSync(filepath1, 'utf-8'));
      const after2 = JSON.parse(fs.readFileSync(filepath2, 'utf-8'));

      expect(after1).toEqual(original1);
      expect(after2).toEqual(original2);
    });

    test('throws when JSON file does not exist', () => {
      const filepath1 = buildFixturePath('file1.json');
      const missing = buildFixturePath('no_such_file.json');
      expect(() => genDiff(filepath1, missing, 'json')).toThrow();
    });
  });

  describe('YAML files', () => {
    test('returns expected json diff for YAML files with all change types', () => {
      const filepath1 = buildFixturePath('file1.yml');
      const filepath2 = buildFixturePath('file2.yml');
      
      const result = genDiff(filepath1, filepath2, 'json');
      const parsed = JSON.parse(result);
      
      // Проверяем, что результат является валидным JSON
      expect(() => JSON.parse(result)).not.toThrow();
      
      // Проверяем новую структуру результата
      expect(parsed).toHaveProperty('summary');
      expect(parsed).toHaveProperty('changes');
      
      // Проверяем summary (аналогично JSON тесту)
      expect(parsed.summary).toEqual({
        total: 5,
        added: 1,
        removed: 2,
        updated: 1,
        unchanged: 1
      });
      
      // Проверяем конкретные изменения (аналогично JSON тесту)
      expect(parsed.changes.removed).toEqual({
        follow: false,
        proxy: '123.234.53.22'
      });
      
      expect(parsed.changes.unchanged).toEqual({
        host: 'hexlet.io'
      });
      
      expect(parsed.changes.updated).toEqual({
        timeout: {
          oldValue: 50,
          newValue: 20
        }
      });
      
      expect(parsed.changes.added).toEqual({
        verbose: true
      });
    });

    test('handles identical YAML files', () => {
      const filepath = buildFixturePath('file1.yml');
      const result = genDiff(filepath, filepath, 'json');
      const parsed = JSON.parse(result);
      
      // Проверяем новую структуру
      expect(parsed).toHaveProperty('summary');
      expect(parsed).toHaveProperty('changes');
      
      // Для идентичных файлов все элементы должны быть в unchanged
      expect(parsed.summary.added).toBe(0);
      expect(parsed.summary.removed).toBe(0);
      expect(parsed.summary.updated).toBe(0);
      expect(parsed.summary.unchanged).toBeGreaterThan(0);
      
      // Проверяем, что все изменения находятся в unchanged
      expect(Object.keys(parsed.changes.unchanged).length).toBeGreaterThan(0);
      expect(Object.keys(parsed.changes.added)).toHaveLength(0);
      expect(Object.keys(parsed.changes.removed)).toHaveLength(0);
      expect(Object.keys(parsed.changes.updated)).toHaveLength(0);
    });

    test('throws when YAML file does not exist', () => {
      const filepath1 = buildFixturePath('file1.yml');
      const missing = buildFixturePath('no_such_file.yml');
      expect(() => genDiff(filepath1, missing, 'json')).toThrow();
    });
  });

  describe('JSON formatter structure validation', () => {
    test('validates JSON structure for different data types', () => {
      const data1 = { 
        string: 'hello', 
        number: 42, 
        boolean: true, 
        nullValue: null 
      };
      const data2 = { 
        string: 'world', 
        number: 24, 
        boolean: false, 
        nullValue: null,
        newProp: 'added'
      };
      
      // Создаем временные файлы
      const tempFile1 = path.join(__dirname, 'temp1.json');
      const tempFile2 = path.join(__dirname, 'temp2.json');
      
      fs.writeFileSync(tempFile1, JSON.stringify(data1, null, 2));
      fs.writeFileSync(tempFile2, JSON.stringify(data2, null, 2));
      
      const result = genDiff(tempFile1, tempFile2, 'json');
      const parsed = JSON.parse(result);
      
      // Проверяем новую структуру JSON
      expect(parsed).toHaveProperty('summary');
      expect(parsed).toHaveProperty('changes');
      expect(parsed.changes).toHaveProperty('added');
      expect(parsed.changes).toHaveProperty('removed');
      expect(parsed.changes).toHaveProperty('updated');
      expect(parsed.changes).toHaveProperty('unchanged');
      
      // Проверяем summary
      expect(parsed.summary.total).toBe(5);
      expect(parsed.summary.added).toBe(1);
      expect(parsed.summary.updated).toBe(3);
      expect(parsed.summary.unchanged).toBe(1);
      expect(parsed.summary.removed).toBe(0);
      
      // Проверяем конкретные изменения
      expect(parsed.changes.updated.string).toEqual({
        oldValue: 'hello',
        newValue: 'world'
      });
      
      expect(parsed.changes.updated.number).toEqual({
        oldValue: 42,
        newValue: 24
      });
      
      expect(parsed.changes.updated.boolean).toEqual({
        oldValue: true,
        newValue: false
      });
      
      expect(parsed.changes.unchanged.nullValue).toBe(null);
      expect(parsed.changes.added.newProp).toBe('added');
      
      // Очистка
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
      
      const result = genDiff(tempFile1, tempFile2, 'json');
      const parsed = JSON.parse(result);
      
      expect(parsed.summary.total).toBe(1);
      expect(parsed.summary.added).toBe(1);
      expect(parsed.summary.removed).toBe(0);
      expect(parsed.summary.updated).toBe(0);
      expect(parsed.summary.unchanged).toBe(0);
      
      expect(parsed.changes.added.newProp).toBe('value');
      expect(Object.keys(parsed.changes.removed)).toHaveLength(0);
      expect(Object.keys(parsed.changes.updated)).toHaveLength(0);
      expect(Object.keys(parsed.changes.unchanged)).toHaveLength(0);
      
      // Очистка
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
      
      const result = genDiff(tempFile1, tempFile2, 'json');
      const parsed = JSON.parse(result);
      
      expect(parsed.summary.total).toBe(1);
      expect(parsed.summary.added).toBe(0);
      expect(parsed.summary.removed).toBe(1);
      expect(parsed.summary.updated).toBe(0);
      expect(parsed.summary.unchanged).toBe(0);
      
      expect(parsed.changes.removed.oldProp).toBe('value');
      expect(Object.keys(parsed.changes.added)).toHaveLength(0);
      expect(Object.keys(parsed.changes.updated)).toHaveLength(0);
      expect(Object.keys(parsed.changes.unchanged)).toHaveLength(0);
      
      // Очистка
      fs.unlinkSync(tempFile1);
      fs.unlinkSync(tempFile2);
    });

    test('handles empty objects', () => {
      const data1 = {};
      const data2 = {};
      
      const tempFile1 = path.join(__dirname, 'temp1.json');
      const tempFile2 = path.join(__dirname, 'temp2.json');
      
      fs.writeFileSync(tempFile1, JSON.stringify(data1, null, 2));
      fs.writeFileSync(tempFile2, JSON.stringify(data2, null, 2));
      
      const result = genDiff(tempFile1, tempFile2, 'json');
      const parsed = JSON.parse(result);
      
      expect(parsed.summary.total).toBe(0);
      expect(parsed.summary.added).toBe(0);
      expect(parsed.summary.removed).toBe(0);
      expect(parsed.summary.updated).toBe(0);
      expect(parsed.summary.unchanged).toBe(0);
      
      expect(Object.keys(parsed.changes.added)).toHaveLength(0);
      expect(Object.keys(parsed.changes.removed)).toHaveLength(0);
      expect(Object.keys(parsed.changes.updated)).toHaveLength(0);
      expect(Object.keys(parsed.changes.unchanged)).toHaveLength(0);
      
      // Очистка
      fs.unlinkSync(tempFile1);
      fs.unlinkSync(tempFile2);
    });

    test('validates JSON formatting with proper indentation', () => {
      const filepath1 = buildFixturePath('file1.json');
      const filepath2 = buildFixturePath('file2.json');
      
      const result = genDiff(filepath1, filepath2, 'json');
      
      // Проверяем, что результат имеет правильное форматирование JSON
      expect(result).toMatch(/^\{\s*"summary":/);
      expect(result).toContain('"summary":');
      expect(result).toContain('"changes":');
      expect(result).toContain('"added":');
      expect(result).toContain('"removed":');
      expect(result).toContain('"updated":');
      expect(result).toContain('"unchanged":');
      expect(result).toContain('"oldValue":');
      expect(result).toContain('"newValue":');
      
      // Проверяем, что JSON валиден
      expect(() => JSON.parse(result)).not.toThrow();
      
      // Проверяем структуру
      const parsed = JSON.parse(result);
      expect(parsed).toHaveProperty('summary');
      expect(parsed).toHaveProperty('changes');
    });
  });
});
