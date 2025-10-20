export const stringifyValue = (value) => {
  if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
    return '[complex value]'
  }
  if (typeof value === 'string') {
    return `'${value}'`
  }
  return String(value)
}

export const stringifyValueForStylish = (value) => {
  if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
    return '[complex value]'
  }
  return String(value)
}
