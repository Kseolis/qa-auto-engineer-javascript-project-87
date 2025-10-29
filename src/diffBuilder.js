import _ from 'lodash'

export const buildDiffTree = (data1, data2) => {
  const keys1 = Object.keys(data1)
  const keys2 = Object.keys(data2)
  const allKeys = _.sortBy([...new Set([...keys1, ...keys2])])

  return allKeys.map((key) => {
    const hasInFirst = Object.hasOwn(data1, key)
    const hasInSecond = Object.hasOwn(data2, key)
    const value1 = data1[key]
    const value2 = data2[key]

    if (!hasInFirst) {
      return { type: 'added', key, value: value2 }
    }
    if (!hasInSecond) {
      return { type: 'removed', key, value: value1 }
    }
    if (value1 === value2) {
      return { type: 'unchanged', key, value: value1 }
    }
    return { type: 'updated', key, value1, value2 }
  })
}

export default buildDiffTree
