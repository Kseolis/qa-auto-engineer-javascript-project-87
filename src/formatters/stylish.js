import { stringifyValueForStylish } from '../utils/string.js';

const renderLine = (sign, key, value) => {
  const prefix = sign === ' ' ? '    ' : `  ${sign} `;
  return `${prefix}${key}: ${stringifyValueForStylish(value)}`;
};

const stylish = (diffTree) => {
  const lines = diffTree.flatMap(({ type, key, value, oldValue, newValue }) => {
    switch (type) {
      case 'unchanged':
        return renderLine(' ', key, value);
      case 'removed':
        return renderLine('-', key, value);
      case 'added':
        return renderLine('+', key, value);
      case 'updated':
        return [
          renderLine('-', key, oldValue),
          renderLine('+', key, newValue),
        ];
      default:
        throw new Error(`Unknown node type: ${type}`);
    }
  });
  return ['{', ...lines, '}'].join('\n');
};

export default stylish;
