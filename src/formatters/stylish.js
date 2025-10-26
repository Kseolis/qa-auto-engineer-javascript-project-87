const renderLine = (sign, key, value) => {
  const prefix = sign === ' ' ? '    ' : `  ${sign} `
  return `${prefix}${key}: ${value}`
}

const stylish = (diffTree) => {
  const lines = []

  for (const node of diffTree) {
    const { type, key, value, value1, value2 } = node

    switch (type) {
      case 'unchanged':
        lines.push(renderLine(' ', key, value))
        break
      case 'removed':
        lines.push(renderLine('-', key, value))
        break
      case 'added':
        lines.push(renderLine('+', key, value))
        break
      case 'updated':
        lines.push(
          renderLine('-', key, value1),
          renderLine('+', key, value2),
        )
        break
      default:
        throw new Error(`Unknown node type: ${type}`)
    }
  }

  return ['{', ...lines, '}'].join('\n')
}

export default stylish
