import os from 'os'
import { handleInvalidInput } from './utils.js'

export const handleOSCommand = command => {
  switch (command) {
    case '--EOL':
      console.log(`EOL: ${os.EOL}`)
      break
    case '--cpus':
      console.log(`CPUs: ${os.cpus().length}`)
      os.cpus().forEach(cpu => {
        console.log(`Model: ${cpu.model}, Speed: ${cpu.speed / 1000} GHz`)
      })
      break
    case '--homedir':
      console.log(`Home directory: ${os.homedir()}`)
      break
    case '--username':
      console.log(`Username: ${os.userInfo().username}`)
      break
    case '--architecture':
      console.log(`CPU architecture: ${os.arch()}`)
      break
    default:
      handleInvalidInput()
      break
  }
}
