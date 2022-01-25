import FileSystem from 'fs-extra'
import Is from '@pwn/is'
import Path from 'path'
import URL from 'url'

const FilePath = URL.fileURLToPath(import.meta.url)
const FolderPath = Path.dirname(FilePath)

const Process = process

function getBinaryName(name) {

  const scopePattern = /^@.+?\/(.+)$/

  switch (true) {
    case scopePattern.test(name):
      return name.replace(scopePattern, '$1')
    default:
      return name
  }

}

async function getBinary(packagePath = Path.resolve('package.json')) {
  console.log(`getBinary('${Path.relative('', packagePath)}')`)

  let { 'bin': binary, 'name': packageName } = await FileSystem.readJson(packagePath, { 'encoding': 'utf-8' })
  let value = null

  switch (true) {
    case Is.string(binary):
      value = [ { 'binary': { 'name': getBinaryName(packageName), 'path': Path.resolve(Path.dirname(packagePath), binary) }, 'package': { 'name': packageName, 'path': packagePath } } ]
      break
    default:
      value = Object.entries(binary || {})
        .map(([ binaryName, binaryPath ]) => ({ 'binary': { 'name': getBinaryName(binaryName), 'path': Path.resolve(Path.dirname(packagePath), binaryPath) }, 'package': { 'name': packageName, 'path': packagePath } }))
  }

  return value

}

async function getPackageBinary(path = Process.cwd()) {
  console.log(`getPackageBinary('${Path.relative('', path)}')`)

  let item = await FileSystem.readdir(path, { 'encoding': 'utf-8', 'withFileTypes': true })

  let _getBinary = item
    .filter((item) => item.isFile())
    .filter((file) => Is.equal(file.name, 'package.json'))
    .map((file) => getBinary(Path.resolve(path, file.name)))

  let _getPackageBinary = item
    .filter((item) => item.isDirectory())
    .filter((folder) => Is.not.equal(_getBinary.length, 0) ? Is.equal(folder.name, 'node_modules') : true)
    .map((folder) => getPackageBinary(Path.resolve(path, folder.name)))

  return Promise.all([ ..._getPackageBinary, ..._getBinary ])

}

async function main() {

  Process.exitCode = 0

  try {

    let packageBinary = await getPackageBinary(Path.resolve(FolderPath, 'folder-2')) // Path.resolve('node_modules/@babel/cli'))

    console.dir(packageBinary.flat(Infinity), { 'depth': null })

  } catch (error) {
    Process.exitCode = 1
    console.error(error)
  }

}

main()