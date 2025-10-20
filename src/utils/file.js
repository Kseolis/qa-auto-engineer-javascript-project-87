import fs from 'fs'

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
