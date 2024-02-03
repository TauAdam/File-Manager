import { opendir } from 'fs/promises'
import { handleOperationFailure } from './utils/warnings.js'

export const goToDirectory = directoryPath => {
  try {
    process.chdir(directoryPath)
  } catch {
    handleOperationFailure()
  }
}

export const goUp = () => {
  goToDirectory('..')
}
export const listContents = async () => {
  try {
    const dir = await opendir(process.cwd())
    const files = []
    const folders = []
    for await (const entry of dir) {
      if (entry.isFile()) {
        files.push({ Name: entry.name, Type: 'file' })
      } else if (entry.isDirectory()) {
        folders.push({ Name: entry.name, Type: 'directory' })
      }
    }
    folders.sort((a, b) => a.Name.localeCompare(b.Name))
    files.sort((a, b) => a.Name.localeCompare(b.Name))

    console.table([...folders, ...files])
  } catch {
    handleOperationFailure()
  }
}
