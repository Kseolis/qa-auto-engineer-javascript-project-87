import path from 'node:path'

export const getFileExtension = filepath => path.extname(filepath).toLowerCase()

export const isJsonExtension = ext => ext === '.json'

export const isYamlExtension = ext => ext === '.yml' || ext === '.yaml'

export const resolvePath = (...segments) => path.resolve(...segments)

export const joinPath = (...segments) => path.join(...segments)
