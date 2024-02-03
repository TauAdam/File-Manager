import os from 'os'
import { handleInput } from './handler.js'
import { createInterface } from 'readline'
import { printCurrentDirectory } from './utils/warnings.js'

const args = process.argv.slice(2)
const username =
  args.find(arg => arg.startsWith('--username='))?.split('=')[1] || 'customer'

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
})

console.log(`Welcome to the File Manager, ${username}! \n`)

process.chdir(os.homedir())
printCurrentDirectory()
rl.prompt()

rl.on('line', async input => {
  if (input === '.exit') {
    rl.close()
  } else {
    try {
      await handleInput(input)
      printCurrentDirectory()
      rl.prompt()
    } catch {
      rl.prompt()
    }
  }
}).on('close', () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`)
  process.exit()
})
