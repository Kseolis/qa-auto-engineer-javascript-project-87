import fs from 'node:fs'
import path from 'node:path'

export const readFile = (filepath) => {
  try {
    return fs.readFileSync(filepath, 'utf-8')
  }
  catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(`File not found: ${filepath}`)
    }
    if (error.code === 'EACCES') {
      throw new Error(`Permission denied: ${filepath}`)
    }
    throw new Error(`Cannot read file: ${filepath}`)
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

export const getFileExtension = filepath => path.extname(filepath).toLowerCase()

export const isJsonExtension = ext => ext === '.json'

export const isYamlExtension = ext => ext === '.yml' || ext === '.yaml'
