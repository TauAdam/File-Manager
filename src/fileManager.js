export const startFileManager = () => {
  const args = process.argv.slice(2)
  const username = args.find(arg => arg.startsWith('--username=')).split('=')[1]

  console.log(`Welcome to the File Manager, ${username}!`)
}
