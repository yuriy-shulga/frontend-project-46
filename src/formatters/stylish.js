import _ from 'lodash'

const baseIndent = ' '
const createIndent = depth => baseIndent.repeat(depth * 4)

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) return String(value)

  const entries = Object.entries(value)
  const lines = entries.map(
    ([key, val]) => `${createIndent(depth + 1)}${key}: ${stringify(val, depth + 1)}`,
  )

  return `{\n${lines.join('\n')}\n${createIndent(depth)}}`
}

const formatLine = (key, value, indentLevel, sign = ' ') => `${createIndent(indentLevel)}  ${sign} ${key}: ${stringify(value, indentLevel + 1)}`

const formatDiff = (node, depth) => {
  const {
    status, key, value, children,
  } = node

  switch (status) {
    case 'added':
      return formatLine(key, value, depth, '+')
    case 'removed':
      return formatLine(key, value, depth, '-')
    case 'unchanged':
      return formatLine(key, value, depth, ' ')
    case 'modified':
      return [
        formatLine(key, value.value1, depth, '-'),
        formatLine(key, value.value2, depth, '+'),
      ].join('\n')
    case 'nested':
      return `${createIndent(depth)}    ${key}: {\n${children.map(child => formatDiff(child, depth + 1)).join('\n')}\n${createIndent(depth + 1)}}`
    default:
      throw new Error(`Unknown status: ${status}`)
  }
}

export default diffTree => `{\n${diffTree.map(node => formatDiff(node, 0)).join('\n')}\n}`
