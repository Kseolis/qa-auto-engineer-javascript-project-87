import formatPlain from './plain.js'
import formatJson from './json.js'
import formatStylish from './stylish.js'

const formatters = {
  stylish: formatStylish,
  plain: formatPlain,
  json: formatJson,
}

export const format = (diffTree, formatName = 'json') => {
  const formatter = formatters[formatName]
  if (!formatter) {
    throw new Error(`Unknown format: ${formatName}`)
  }
  return formatter(diffTree)
}
