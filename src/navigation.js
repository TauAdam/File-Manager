import { opendir } from 'fs/promises'
import { handleOperationFailure } from './utils.js'

export const goUp = () => {
  try {
    process.chdir('..')
  } catch (error) {
    handleOperationFailure()
  }
}

export const goToDirectory = path => {
  try {
    process.chdir(path)
  } catch {
    handleOperationFailure()
  }
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

    const contents = [...folders, ...files]
    console.log('\n')
    console.table(contents)
  } catch {
    handleOperationFailure()
  }
}
