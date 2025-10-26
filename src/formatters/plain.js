const plain = (diffTree) => {
  const lines = diffTree
    .filter(({ type }) => type !== 'unchanged')
    .map(({ type, key, value, oldValue, newValue }) => {
      switch (type) {
        case 'removed':
          return `Property '${key}' was removed`
        case 'added':
          return `Property '${key}' was added with value: ${value}`
        case 'updated':
          return `Property '${key}' was updated. From ${oldValue} to ${newValue}`
        default:
          throw new Error(`Unknown node type: ${type}`)
      }
    })

  return lines.join('\n')
}

export default plain
