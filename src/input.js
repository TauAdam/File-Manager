import { createInterface } from 'readline'
import { printCurrentDirectory } from './fileManager.js'
import { goToDirectory, goUp, listContents } from './navigation.js'
import { handleInvalidInput } from './utils.js'

export const readInput = username => {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  rl.prompt()

  rl.on('line', input => {
    if (input === '.exit') {
      rl.close()
    } else {
      handleInput(input.trim())
      rl.prompt()
    }
  })

  rl.on('close', () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`)
    process.exit(0)
  })
}

const handleInput = input => {
  const [command, ...args] = input.split(' ')

  switch (command) {
    case 'up':
      goUp()
      printCurrentDirectory()
      break
    case 'cd':
      goToDirectory(args[0])
      printCurrentDirectory()
      break
    case 'ls':
      listContents()
      printCurrentDirectory()
      break
    default:
      handleInvalidInput()
      break
  }
}
