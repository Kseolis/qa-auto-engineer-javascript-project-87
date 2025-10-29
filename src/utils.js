import fs from 'node:fs'
import path from 'node:path'
import { parse } from './parser.js'

export const extractFormat = filepath => path
  .extname(filepath)
  .toLowerCase()
  .slice(1)

export const readFile = (filepath) => {
  try {
    const content = fs.readFileSync(filepath, 'utf-8')
    return parse(content, extractFormat(filepath))
  }
  catch (error) {
    throw new Error(`Cannot read file: ${filepath}: ${error.message}`)
  }
}
