# File Manager

This repository contains a command-line interface (CLI) File Manager implemented using Node.js APIs. The File Manager is capable of performing basic file operations, utilizing the Streams API, retrieving information about the host machine operating system, performing hash calculations, and compressing and decompressing files.

## Features

- CLI-based interaction
- Basic file operations including copy, move, delete, rename, etc.
- Utilization of Streams API
- Retrieval of host machine operating system information
- Performance of hash calculations
- File compression and decompression

## Technical Requirements

- No external dependencies are required.
- The project uses the 20 LTS version of Node.js.
- The program is started by the npm-script `start` in the following way:
```bash
npm run start -- --username=your_username
```
- Upon starting, the program displays a welcome message in the console.
- After the program finishes its work (when ctrl + c is pressed or the user sends the .exit command into the console), the program displays a goodbye message in the console.
- At the start of the program and after each end of input/operation, the current working directory is printed in the console.
- The starting working directory is the current user’s home directory.
- By default, the program prompts the user in the console to print commands and wait for results.
- In case of unknown operation or invalid input, an Invalid input message is shown and the user can enter another command.
In case of an error during the execution of an operation, an Operation failed message is shown and the user can enter another command.
- The user cannot go higher than the root directory. If the user tries to do so, the current working directory doesn’t change.