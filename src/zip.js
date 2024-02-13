import { createBrotliCompress, createBrotliDecompress } from 'zlib'
import { createReadStream, createWriteStream } from 'fs'
import { basename, parse, resolve } from 'path'
import { isItDirectory } from './utils/exist.js'

const compressFile = async (source, destination) => {
  return new Promise(async (res, rej) => {
    const isDirectory = await isItDirectory(resolve(destination))
    const outputPath = isDirectory
      ? resolve(destination, `${basename(source)}.br`)
      : resolve(destination)

    const inputStream = createReadStream(resolve(source))
    const outputStream = createWriteStream(outputPath, {
      flags: 'wx',
    })
    const compressStream = createBrotliCompress()

    inputStream
      .on('error', rej)
      .pipe(compressStream)
      .on('error', rej)
      .pipe(outputStream)
      .on('error', rej)
      .on('finish', res)
  })
}

const decompressFile = (source, destination) => {
  return new Promise(async (res, rej) => {
    const isDirectory = await isItDirectory(resolve(destination))
    const outputPath = isDirectory
      ? resolve(destination, parse(source).name)
      : resolve(destination)

    const inputStream = createReadStream(resolve(source))
    const outputStream = createWriteStream(outputPath, {
      flags: 'wx',
    })
    const decompressStream = createBrotliDecompress()

    inputStream
      .on('error', rej)
      .pipe(decompressStream)
      .on('error', rej)
      .pipe(outputStream)
      .on('error', rej)
      .on('finish', res)
  })
}

export { compressFile, decompressFile }
