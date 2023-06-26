let currentDirectory
const printCurrentDirectory = () => {
  console.log(`You are currently in ${currentDirectory}`)
}

export const startFileManager = () => {
  const args = process.argv.slice(2)
  const username = args.find(arg => arg.startsWith('--username=')).split('=')[1]
  currentDirectory = process.cwd()
  console.log(`Welcome to the File Manager, ${username}!`)
  printCurrentDirectory()
}
