const renderLine = (sign, key, value) => {
  const prefix = sign === ' ' ? '    ' : `  ${sign} `
  return `${prefix}${key}: ${value}`
}

const stylish = (diffTree) => {
  const lines = diffTree.flatMap((node) => {
    const { type, key, value, value1, value2 } = node

    switch (type) {
      case 'unchanged':
        return [renderLine(' ', key, value)]
      case 'removed':
        return [renderLine('-', key, value)]
      case 'added':
        return [renderLine('+', key, value)]
      case 'updated':
        return [
          renderLine('-', key, value1),
          renderLine('+', key, value2),
        ]
      default:
        throw new Error(`Unknown node type: ${type}`)
    }
  })
  return ['{', ...lines, '}'].join('\n')
}
export default stylish
