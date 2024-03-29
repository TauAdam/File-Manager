import { createReadStream, createWriteStream } from 'fs'
import { basename, dirname, join, resolve } from 'path'
import { rename, rm } from 'fs/promises'
import { pipeline } from 'stream/promises'
import { isFileExist } from './utils/exist.js'

const readFile = filePath => {
  return new Promise((res, rej) => {
    createReadStream(resolve(filePath), 'utf-8')
      .on('error', rej)
      .on('end', res)
      .pipe(process.stdout)
  })
}

const createFile = async fileName => {
  return new Promise((res, rej) => {
    createWriteStream(resolve(fileName), { flags: 'wx' })
      .on('error', rej)
      .on('close', res)
      .close()
  })
}
const copyFile = async (filePath, newDirPath) => {
  try {
    const destinationPath = join(newDirPath, basename(filePath))
    if (await isFileExist(destinationPath)) {
      throw new Error('Destination file already exists')
    }
    const readable = createReadStream(resolve(filePath))
    const writeable = createWriteStream(destinationPath)
    await pipeline(readable, writeable)
  } catch (error) {
    throw new Error(error)
  }
}

const moveFile = async (filePath, newDirPath) => {
  try {
    await copyFile(filePath, newDirPath)
    await removeFile(filePath)
  } catch (error) {
    throw new Error(error)
  }
}
const renameFile = async (filePath, newFilename) => {
  try {
    const directoryPath = dirname(resolve(filePath))
    const newFilePath = join(directoryPath, newFilename)
    if (await isFileExist(newFilePath)) {
      throw new Error('File with the new name already exists')
    }
    await rename(resolve(filePath), newFilePath)
  } catch (error) {
    throw new Error(error)
  }
}

const removeFile = async filePath => {
  try {
    await rm(resolve(filePath))
  } catch (error) {
    throw new Error(error)
  }
}
export { readFile, createFile, copyFile, removeFile, renameFile, moveFile }
