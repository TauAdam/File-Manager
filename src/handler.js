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
      await readFile(args[0])
      break
    case 'add':
      await createFile(args[0])
      break
    case 'cp':
      await copyFile(args[0], args[1])
      break
    case 'mv':
      await moveFile(args[0], args[1])
      break
    case 'rn':
      await renameFile(args[0], args[1])
      break
    case 'rm':
      await removeFile(args[0])
      break
    default:
      handleInvalidInput()
      break
  }
}
