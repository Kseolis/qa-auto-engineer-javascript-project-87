import { fileURLToPath } from 'node:url'
import path from 'node:path'

export const getFixturePath = (relative) => {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  return path.join(__dirname, '..', '__fixtures__', relative)
}
