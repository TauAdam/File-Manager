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

export const handleInput = async input => {
  const [command, ...args] = input.trim().split(' ')

  switch (command) {
    case 'up':
      if (args.length === 0) {
        goUp()
        break
      } else {
        handleInvalidInput()
        break
      }
    case 'cd':
      if (args.length === 1) {
        goToDirectory(args[0])
        break
      } else {
        handleInvalidInput()
        break
      }
    case 'ls':
      if (args.length === 0) {
        await listContents()
        break
      } else {
        handleInvalidInput()
        break
      }
    case 'cat':
      if (args.length === 1) {
        await readFile(args[0])
        break
      } else {
        handleInvalidInput()
        break
      }
    case 'add':
      if (args.length === 1) {
        await createFile(args[0])
        break
      } else {
        handleInvalidInput()
        break
      }
    case 'cp':
      if (args.length === 2) {
        await copyFile(args[0], args[1])
        break
      } else {
        handleInvalidInput()
        break
      }
    case 'mv':
      if (args.length === 2) {
        await moveFile(args[0], args[1])
        break
      } else {
        handleInvalidInput()
        break
      }
    case 'rn':
      if (args.length === 2) {
        await renameFile(args[0], args[1])
        break
      } else {
        handleInvalidInput()
        break
      }
    case 'rm':
      if (args.length === 1) {
        await removeFile(args[0])
        break
      } else {
        handleInvalidInput()
        break
      }
    case 'os':
      if (args.length === 1) {
        handleOSCommands(args[0])
        break
      } else {
        handleInvalidInput()
        break
      }
    case 'hash':
      if (args.length === 1) {
        await calcHash(args[0])
        break
      } else {
        handleInvalidInput()
        break
      }
    case 'compress':
      if (args.length === 2) {
        await compressFile(args[0], args[1])
        break
      } else {
        handleInvalidInput()
        break
      }
    case 'decompress':
      if (args.length === 2) {
        await decompressFile(args[0], args[1])
        break
      } else {
        handleInvalidInput()
        break
      }
    default:
      handleInvalidInput()
      break
  }
}
