import { stringifyValue } from '../utils/string.js';

const plain = (diffTree) => {
  const lines = diffTree
    .filter(({ type }) => type !== 'unchanged')
    .map(({ type, key, value, oldValue, newValue }) => {
      switch (type) {
        case 'removed':
          return `Property '${key}' was removed`;
        case 'added':
          return `Property '${key}' was added with value: ${stringifyValue(value)}`;
        case 'updated':
          return `Property '${key}' was updated. From ${stringifyValue(oldValue)} to ${stringifyValue(newValue)}`;
        default:
          throw new Error(`Unknown node type: ${type}`);
      }
    });
  
  return lines.join('\n');
};

export default plain;
