import FileSystem from 'fs-extra'
import Find from 'find'
import Is from '@pwn/is'
import JSON5 from 'json5'

const Process = process

export async function GetDependencyBinary(packageDependency, dependencyPath = `${Process.cwd()}/node_modules`) {

  let dependencyBinary = []
  let packagePath = Find.fileSync(/package\.json$/, dependencyPath)

  for (let _packagePath of packagePath) {

    let { name: packageName, bin: packageBinary } = JSON5.parse(await FileSystem.readFile(_packagePath, { 'encoding': 'utf-8' }))

    if (Is.not.undefined(packageBinary)) {

      /* c8 ignore next 3 */
      if (Is.string(packageBinary)) {
        dependencyBinary.push({ 'packageName': packageName, 'binaryName': packageName })
      } else {

        for (let property in packageBinary) {
          dependencyBinary.push({ 'packageName': packageName, 'binaryName': property })
        }

      }

    }

  }

  return dependencyBinary
    .filter((binary) => packageDependency.includes(binary.packageName))
    .sort((leftBinary, rightBinary) => Is.not.equal(leftBinary.packageName, rightBinary.packageName) ? leftBinary.packageName.localeCompare(rightBinary.packageName) : leftBinary.binaryName.localeCompare(rightBinary.binaryName))

}
