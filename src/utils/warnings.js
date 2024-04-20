const handleInvalidInput = () => {
  console.log('Invalid input')
}
const handleOperationFailure = () => {
  console.log('Operation failed')
}
const printCurrentDirectory = () => {
  console.log(`You are currently in ${process.cwd()}`)
}
export { handleInvalidInput, handleOperationFailure, printCurrentDirectory }
