const stringifyValue = (value) => {
  if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
    return '[complex value]';
  }
  return String(value);
};

const renderLine = (sign, key, value) => {
  const prefix = sign === ' ' ? '    ' : `  ${sign} `;
  return `${prefix}${key}: ${stringifyValue(value)}`;
};

const stylish = (diffTree) => {
  const lines = diffTree.flatMap((node) => {
    switch (node.type) {
      case 'unchanged':
        return renderLine(' ', node.key, node.value);
      case 'removed':
        return renderLine('-', node.key, node.value);
      case 'added':
        return renderLine('+', node.key, node.value);
      case 'updated':
        return [
          renderLine('-', node.key, node.oldValue),
          renderLine('+', node.key, node.newValue),
        ];
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });
  return ['{', ...lines, '}'].join('\n');
};

export default stylish;


