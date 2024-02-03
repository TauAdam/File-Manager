import os from 'os'
import { handleInvalidInput } from './utils/warnings.js'

export const handleOSCommands = command => {
  switch (command) {
    case '--EOL':
      console.log(`EOL: ${os.EOL}`)
      break
    case '--cpus':
      console.log(`Overall amount of CPUS: ${os.cpus().length}`)
      const cpus = os.cpus().map(cpu => ({
        Model: cpu.model,
        Speed: `${cpu.speed / 1000} GHz`
      }));
      console.table(cpus);
      break
    case '--homedir':
      console.log(`Home directory: ${os.homedir()}`)
      break
    case '--username':
      console.log(`System user name: ${os.userInfo().username}`)
      break
    case '--architecture':
      console.log(`CPU architecture: ${os.arch()}`)
      break
    default:
      handleInvalidInput()
      break
  }
}
