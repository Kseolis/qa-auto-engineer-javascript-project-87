const getIndent = sign => (sign === ' ' ? '    ' : `  ${sign} `)

const stringify = (value, depth = 1) => {
  if (value !== null && typeof value === 'object') {
    const indentSize = 4
    const currentIndent = ' '.repeat(indentSize * depth)
    const bracketIndent = ' '.repeat(indentSize * (depth - 1))
    const entries = Object.entries(value)
      .map(([key, value]) => `${currentIndent}${key}: ${stringify(value, depth + 1)}`)
    return `{
${entries.join('\n')}
${bracketIndent}}`
  }
  return String(value)
}

const renderLine = (sign, key, value) => `${getIndent(sign)}${key}: ${stringify(value)}`

const formatStylish = (diffTree) => {
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
export default formatStylish
