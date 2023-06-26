import os from 'os'
import { readInput } from './input.js'

export let currentDirectory
export const printCurrentDirectory = () => {
  console.log(`You are currently in ${currentDirectory}`)
}

export const startFileManager = () => {
  const args = process.argv.slice(2)
  const username = args.find(arg => arg.startsWith('--username=')).split('=')[1]
  console.log(`Welcome to the File Manager, ${username}!`)
  currentDirectory = os.homedir()
  printCurrentDirectory()
  readInput(username)
}
