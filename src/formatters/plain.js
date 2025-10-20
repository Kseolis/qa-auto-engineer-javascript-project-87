const stringifyValue = (value) => {
  if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const plain = (diffTree) => {
  const lines = diffTree
    .filter((node) => node.type !== 'unchanged')
    .map((node) => {
      switch (node.type) {
        case 'removed':
          return `Property '${node.key}' was removed`;
        case 'added':
          return `Property '${node.key}' was added with value: ${stringifyValue(node.value)}`;
        case 'updated':
          return `Property '${node.key}' was updated. From ${stringifyValue(node.oldValue)} to ${stringifyValue(node.newValue)}`;
        default:
          throw new Error(`Unknown node type: ${node.type}`);
      }
    });
  
  return lines.join('\n');
};

export default plain;
