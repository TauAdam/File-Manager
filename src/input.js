import { createInterface } from 'readline'
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
      break
    case 'cd':
      goToDirectory(args[0])
      break
    case 'ls':
      listContents()
      break
    default:
      handleInvalidInput()
      break
  }
}
