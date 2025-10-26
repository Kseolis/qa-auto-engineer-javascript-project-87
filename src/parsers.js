import yaml from 'js-yaml'
import { getFormat } from './utils.js'

export const parseFileContent = (filepath, content) => {
  const format = getFormat(filepath)

  try {
    const parsers = {
      json: () => JSON.parse(content),
      yaml: () => yaml.load(content),
    }
    const parser = parsers[format]
    return parser()
  }
  catch (error) {
    throw new Error(`Failed to parse ${format}: ${error.message}`)
  }
}
