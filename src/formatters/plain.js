import _ from 'lodash'

const formatValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`
  }

  if (_.isPlainObject(value)) {
    return '[complex value]'
  }

  return value
}

const formatDiff = (node, path) => {
  const {
    status, value, children, key,
  } = node
  const fullPath = path ? `${path}.${key}` : key

  switch (status) {
    case 'removed':
      return `Property '${fullPath}' was removed`
    case 'added':
      return `Property '${fullPath}' was added with value: ${formatValue(value)}`
    case 'modified':
      return `Property '${fullPath}' was updated. From ${formatValue(value.value1)} to ${formatValue(value.value2)}`
    case 'nested':
      return children.flatMap(child => formatDiff(child, fullPath))
    default:
      return []
  }
}

export default diffTree => diffTree.flatMap(node => formatDiff(node, '')).join('\n')
