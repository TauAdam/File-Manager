import { createReadStream, createWriteStream } from 'fs'
import { handleOperationFailure } from './utils/warnings.js'
import { basename, dirname, join, resolve } from 'path'
import { open, rename, unlink } from 'fs/promises'
import { pipeline } from 'stream/promises'
import { isFileExist } from './utils/isFileExist.js'

const read = filePath => {
  return new Promise((res, reject) => {
    const stream = createReadStream(resolve(filePath), 'utf-8');
    stream.on('data', chunk => {
      console.log(chunk);
    });
    stream.on('error', err => {
      handleOperationFailure();
      reject(err);
    });
    stream.on('end', res);
  });
};

const createFile = async fileName => {
  let fd
  try {
    fd = await open(resolve(fileName), 'wx')
  } catch {
    handleOperationFailure()
  } finally {
    fd?.close()
  }
}
const copyFile = async (filePath, newDirPath) => {
  try {
    const destinationPath = join(newDirPath, basename(filePath));
    await isFileExist(destinationPath, handleOperationFailure)
    const readable = createReadStream(resolve(filePath))
    const writeable = createWriteStream(destinationPath)
    await pipeline(readable, writeable)
  } catch {
    handleOperationFailure()
  }
}

const moveFile = async (filePath, newDirPath) => {
  try {
    await copyFile(filePath, newDirPath)
    await unlink(resolve(filePath))
  } catch {
    handleOperationFailure()
  }
}
const renameFile = async (filePath, newFilename) => {
  try {
    const directoryPath = dirname(resolve(filePath))
    const newFilePath = join(directoryPath, newFilename)
    await rename(resolve(filePath), newFilePath)
  } catch {
    handleOperationFailure()
  }
}

const removeFile = async filePath => {
  try {
    await unlink(resolve(filePath))
  } catch {
    handleOperationFailure()
  }
}
export { read, createFile, copyFile, removeFile, renameFile, moveFile }
