import { stringifyValueForStylish } from '../utils.js'

const renderLine = (sign, key, value) => {
  const prefix = sign === ' ' ? '    ' : `  ${sign} `
  return `${prefix}${key}: ${stringifyValueForStylish(value)}`
}

const stylish = (diffTree) => {
  const lines = []

  for (const node of diffTree) {
    const { type, key, value, oldValue, newValue } = node

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
          renderLine('-', key, oldValue),
          renderLine('+', key, newValue),
        )
        break
      default:
        throw new Error(`Unknown node type: ${type}`)
    }
  }

  return ['{', ...lines, '}'].join('\n')
}

export default stylish
