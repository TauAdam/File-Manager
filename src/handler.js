import { goToDirectory, goUp, listContents } from './navigation.js'
import { handleInvalidInput } from './utils/warnings.js'
import { handleOSCommands } from './os.js'
import {
  copyFile,
  createFile,
  moveFile,
  readFile,
  removeFile,
  renameFile,
} from './files.js'
import { calcHash } from './hash.js'
import { compressFile, decompressFile } from './zip.js'

const commands = {
  up: { func: goUp, argCount: 0 },
  cd: { func: goToDirectory, argCount: 1 },
  ls: { func: listContents, argCount: 0 },
  cat: { func: readFile, argCount: 1 },
  add: { func: createFile, argCount: 1 },
  cp: { func: copyFile, argCount: 2 },
  mv: { func: moveFile, argCount: 2 },
  rn: { func: renameFile, argCount: 2 },
  rm: { func: removeFile, argCount: 1 },
  os: { func: handleOSCommands, argCount: 1 },
  hash: { func: calcHash, argCount: 1 },
  compress: { func: compressFile, argCount: 2 },
  decompress: { func: decompressFile, argCount: 2 },
}

export const handleInput = async input => {
  const [command, ...args] = input.trim().split(' ')

  if (commands[command] && args.length === commands[command].argCount) {
    await commands[command].func(...args)
  } else {
    handleInvalidInput()
  }
}
