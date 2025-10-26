import fs from 'fs'
import { describe, expect, test } from '@jest/globals'
import { getFixturePath } from './helpers.js'
import diffBuilder from '../src/diffBuilder.js'

describe('genDiff', () => {
  const formats = ['json', 'yml']

  test.each(formats)('test %s format', (format) => {
    const filepath1 = getFixturePath(`file1.${format}`)
    const filepath2 = getFixturePath(`file2.${format}`)

    const expectedStylish = fs.readFileSync(getFixturePath('expectedStylish.txt'), 'utf-8')
    const expectedPlain = fs.readFileSync(getFixturePath('expectedPlain.txt'), 'utf-8')
    const expectedJson = fs.readFileSync(getFixturePath('expectedJsonFormat.txt'), 'utf-8')

    expect(diffBuilder(filepath1, filepath2)).toBe(expectedStylish)
    expect(diffBuilder(filepath1, filepath2, 'json')).toBe(expectedJson)
    expect(diffBuilder(filepath1, filepath2, 'plain')).toBe(expectedPlain)
    expect(diffBuilder(filepath1, filepath2, 'stylish')).toBe(expectedStylish)
  })

  test('throws when file does not exist', () => {
    const filepath1 = getFixturePath('file1.json')
    const missing = getFixturePath('no_such_file.json')
    expect(() => diffBuilder(filepath1, missing)).toThrow()
  })
})
