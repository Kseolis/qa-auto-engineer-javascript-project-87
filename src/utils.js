import fs from 'node:fs'
import path from 'node:path'

export const readFile = (filepath) => {
  try {
    return fs.readFileSync(filepath, 'utf-8')
  }
  catch (error) {
    throw new Error(`Cannot read file: ${filepath}: ${error.message}`)
  }
}

export const stringifyValue = (value) => {
  if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
    return '[complex value]'
  }
  if (typeof value === 'string') {
    return `'${value}'`
  }
  return String(value)
}

export const stringifyValueForStylish = (value) => {
  if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
    return '[complex value]'
  }
  return String(value)
}

export const getFormat = (filepath) => {
  const ext = path.extname(filepath).toLowerCase()
  if (ext === '.json') {
    return 'json'
  }
  else if (ext === '.yml' || ext === '.yaml') {
    return 'yaml'
  }
  throw new Error(`Unsupported file extension: ${ext}`)
}
