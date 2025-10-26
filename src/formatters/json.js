const json = (diffTree) => {
  const changes = {
    added: {},
    removed: {},
    updated: {},
    unchanged: {},
  }

  for (const { type, key, value, value1, value2 } of diffTree) {
    switch (type) {
      case 'added':
        changes.added[key] = value
        break
      case 'removed':
        changes.removed[key] = value
        break
      case 'updated':
        changes.updated[key] = { value1, value2 }
        break
      case 'unchanged':
        changes.unchanged[key] = value
        break
      default:
        throw new Error(`Unknown node type: ${type}`)
    }
  }

  const result = {
    summary: {
      total: diffTree.length,
      added: Object.keys(changes.added).length,
      removed: Object.keys(changes.removed).length,
      updated: Object.keys(changes.updated).length,
      unchanged: Object.keys(changes.unchanged).length,
    },
    changes,
  }

  return JSON.stringify(result, null, 2)
}

export default json
