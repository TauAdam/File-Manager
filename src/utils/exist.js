import { access, stat } from 'fs/promises'

const isFileExist = async path => {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}
const isItDirectory = async path => {
  try {
    return (await stat(path)).isDirectory()
  } catch {
    return false
  }
}
export { isFileExist, isItDirectory }
