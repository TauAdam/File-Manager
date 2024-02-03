import { access } from 'fs/promises'

export const isFileExist = async path => {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}
