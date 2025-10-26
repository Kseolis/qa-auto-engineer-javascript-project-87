import fs from 'node:fs'
import path from 'node:path'
import { parseFileContent } from './parsers.js'

export const readFile = (filepath) => {
  try {
    return parseFileContent(filepath, fs.readFileSync(filepath, 'utf-8'))
  }
  catch (error) {
    throw new Error(`Cannot read file: ${filepath}: ${error.message}`)
  }
}

export const getFormat = (filepath) => {
  const ext = path.extname(filepath)
    .toLowerCase()
    .replace('.', '')
  if (ext === 'yml') {
    return 'yaml'
  }
  return ext
}
