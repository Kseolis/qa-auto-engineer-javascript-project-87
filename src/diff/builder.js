export const buildDiffTree = (data1, data2) => {
  const keys1 = Object.keys(data1)
  const keys2 = Object.keys(data2)
  const allKeys = [...new Set([...keys1, ...keys2])].sort((a, b) => a.localeCompare(b))

  return allKeys.map((key) => {
    const has1 = Object.hasOwn(data1, key)
    const has2 = Object.hasOwn(data2, key)
    const [val1, val2] = [data1[key], data2[key]]

    if (has1 && has2 && Object.is(val1, val2)) {
      return { type: 'unchanged', key, value: val1 }
    }
    if (has1 && has2 && !Object.is(val1, val2)) {
      return { type: 'updated', key, oldValue: val1, newValue: val2 }
    }
    if (has1 && !has2) {
      return { type: 'removed', key, value: val1 }
    }
    if (!has1 && has2) {
      return { type: 'added', key, value: val2 }
    }
  }).filter(Boolean)
}
