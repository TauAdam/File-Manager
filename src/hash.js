import { createHash } from 'crypto'
import { createReadStream } from 'fs'
import { resolve } from 'path'

export const calcHash = filePath => {
  return new Promise((res, rej) => {
    const hash = createHash('sha256')
    createReadStream(resolve(filePath))
      .on('error', rej)
      .on('end', () => {
        console.log(hash.digest('hex'))
        res()
      })
      .on('data', data => hash.update(data))
  })
}
