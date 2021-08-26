import FileSystem from 'fs-extra'
import Find from 'find'
import Is from '@pwn/is'

const Process = process

export async function GetPackageBinary(rootPath = `${Process.cwd()}/node_modules`) {

  let packageBinary = []
  let packagePath = Find.fileSync(/package\.json$/, rootPath)

  for (let path of packagePath) {

    let { name, bin } = await FileSystem.readJson(path, { 'encoding': 'utf-8' })

    if (Is.not.undefined(bin)) {

      /* c8 ignore next 3 */
      if (Is.string(bin)) {
        packageBinary.push({ 'name': name, 'binary': name })
      } else {

        for (let property in bin) {
          packageBinary.push({ 'name': name, 'binary': property })
        }

      }

    }

  }

  return packageBinary
    .sort((leftBinary, rightBinary) => Is.not.equal(leftBinary.name, rightBinary.name) ? leftBinary.name.localeCompare(rightBinary.name) : leftBinary.binary.localeCompare(rightBinary.binary))
    .filter((binary, index, packageBinary) => Is.equal(index, 0) || Is.not.equal(binary.name, packageBinary[index - 1].name) || Is.not.equal(binary.binary, packageBinary[index - 1].binary))
  
}
