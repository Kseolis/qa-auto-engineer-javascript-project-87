import yaml from 'js-yaml'

const parsers = {
  json: JSON.parse,
  yaml: yaml.load,
  yml: yaml.load,
}

export const parse = (content, format) => {
  try {
    const parser = parsers[format]
    return parser(content)
  }
  catch (error) {
    throw new Error(`Failed to parse ${format}: ${error.message}`)
  }
}
