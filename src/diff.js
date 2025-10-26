import { buildDiffTree } from './diff/index.js'
import { format } from './formatters/index.js'
import { readFile } from './utils.js'

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = readFile(filepath1)
  const data2 = readFile(filepath2)
  const diffTree = buildDiffTree(data1, data2)
  return format(diffTree, formatName)
}

export default genDiff
