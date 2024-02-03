import { goToDirectory, goUp, listContents } from './navigation.js'
import { handleInvalidInput } from './utils/warnings.js'
import { handleOSCommands } from './os.js'
import {
  copyFile,
  createFile,
  moveFile,
  read,
  removeFile,
  renameFile,
} from './operations.js'

export const handleInput = async input => {
  const [command, ...args] = input.trim().split(' ')

  switch (command) {
    case 'up':
      goUp()
      break
    case 'cd':
      goToDirectory(args[0])
      break
    case 'ls':
      await listContents()
      break
    case 'os':
      handleOSCommands(args[0])
      break
    case 'cat':
      await read(args[0])
      break
    case 'add':
      await createFile(args[0])
      break
    case 'cp':
      copyFile(args[0], args[1])
      break
    case 'mv':
      moveFile(args[0], args[1])
      break
    case 'rn':
      renameFile(args[0], args[1])
      break
    case 'rm':
      removeFile(args[0])
      break
    default:
      handleInvalidInput()
      break
  }
}
