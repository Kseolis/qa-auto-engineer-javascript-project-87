const json = (diffTree) => {
  const changes = {
    added: {},
    removed: {},
    updated: {},
    unchanged: {}
  };

  diffTree.forEach(node => {
    switch (node.type) {
      case 'added':
        changes.added[node.key] = node.value;
        break;
      case 'removed':
        changes.removed[node.key] = node.value;
        break;
      case 'updated':
        changes.updated[node.key] = {
          oldValue: node.oldValue,
          newValue: node.newValue
        };
        break;
      case 'unchanged':
        changes.unchanged[node.key] = node.value;
        break;
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });

  const result = {
    summary: {
      total: diffTree.length,
      added: Object.keys(changes.added).length,
      removed: Object.keys(changes.removed).length,
      updated: Object.keys(changes.updated).length,
      unchanged: Object.keys(changes.unchanged).length
    },
    changes
  };

  return JSON.stringify(result, null, 2);
};

export default json;
