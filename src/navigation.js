import { opendir } from 'fs/promises'

const goToDirectory = directoryPath => {
  try {
    process.chdir(directoryPath)
  } catch {
    throw new Error()
  }
}

const goUp = () => {
  goToDirectory('..')
}
const listContents = async () => {
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
    throw new Error()
  }
}
export { goToDirectory, goUp, listContents }
