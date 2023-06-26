import { opendir } from 'fs/promises'
import { resolve } from 'path'
import { currentDirectory, printCurrentDirectory } from './fileManager.js'
import { handleOperationFailure } from './utils.js'

export const goUp = () => {
  let parentDirectory
  if (currentDirectory !== '/') {
    parentDirectory = resolve(currentDirectory, '..')
  }
  printCurrentDirectory(parentDirectory)
}

export const goToDirectory = path => {
  const newPath = resolve(currentDirectory, path)

  try {
    currentDirectory = newPath
    printCurrentDirectory()
  } catch {
    handleOperationFailure()
  }
}

export const listContents = async () => {
  try {
    const dir = await opendir(currentDirectory)
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
