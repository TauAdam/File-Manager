import os from 'os'
import { readInput } from './input.js'

export const printCurrentDirectory = () => {
  console.log(`You are currently in ${process.cwd()}`)
}

export const startFileManager = () => {
  const args = process.argv.slice(2)
  const username = args.find(arg => arg.startsWith('--username=')).split('=')[1]
  console.log(`Welcome to the File Manager, ${username}!`)
  process.chdir(os.homedir())
  printCurrentDirectory()
  readInput(username)
}
