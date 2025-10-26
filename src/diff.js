import { readFile } from './utils/file.js'
import { parseFileContent } from './parsers.js'
import { buildDiffTree } from './diff/index.js'
import { formatDiff } from './formatters/index.js'

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parseFileContent(filepath1, readFile(filepath1))
  const data2 = parseFileContent(filepath2, readFile(filepath2))
  const diffTree = buildDiffTree(data1, data2)
  return formatDiff(diffTree, formatName)
}

export default genDiff
