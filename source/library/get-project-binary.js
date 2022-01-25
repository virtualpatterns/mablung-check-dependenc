import FileSystem from 'fs-extra'
import Is from '@pwn/is'
import Path from 'path'

import { GetBinary } from './get-binary.js'

const Process = process

export async function GetProjectBinary(path = Process.cwd()) {

  let item = await FileSystem.readdir(path, { 'encoding': 'utf-8', 'withFileTypes': true })

  let getBinary = item
    .filter((item) => item.isFile())
    .filter((file) => Is.equal(file.name, 'package.json'))
    .map((file) => GetBinary(Path.resolve(path, file.name)))

  let getProjectBinary = item
    .filter((item) => item.isDirectory())
    .filter((folder) => Is.not.equal(getBinary.length, 0) ? Is.equal(folder.name, 'node_modules') : true)
    .map((folder) => GetProjectBinary(Path.resolve(path, folder.name)))

  return Promise.all([ ...getProjectBinary, ...getBinary ])

}
