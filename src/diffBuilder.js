import { format } from './formatter/index.js'
import { readFile } from './utils.js'
import _ from 'lodash'

export const buildDiffTree = (data1, data2) => {
  const keys1 = Object.keys(data1)
  const keys2 = Object.keys(data2)
  const allKeys = _.sortBy([...new Set([...keys1, ...keys2])])

  return allKeys.map((key) => {
    const has1 = Object.hasOwn(data1, key)
    const has2 = Object.hasOwn(data2, key)
    const [val1, val2] = [data1[key], data2[key]]

    if (!has1) {
      return { type: 'added', key, value: val2 }
    }
    if (!has2) {
      return { type: 'removed', key, value: val1 }
    }
    if (val1 === val2) {
      return { type: 'unchanged', key, value: val1 }
    }
    return { type: 'updated', key, value1: val1, value2: val2 }
  })
}

const diffBuilder = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = readFile(filepath1)
  const data2 = readFile(filepath2)
  const diffTree = buildDiffTree(data1, data2)
  return format(diffTree, formatName)
}

export default diffBuilder
