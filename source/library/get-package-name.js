
const dotPattern = /^.{1,2}\/.*$/
const modulePattern = /^module:(.*?)$/
const namePattern = /^([^@].*?)\/.*$/
const scopePattern = /^(@.*?\/.*?)\/.*$/

export function GetPackageName(packageName) {

  switch (true) {
    case dotPattern.test(packageName):
      return packageName
    case modulePattern.test(packageName):
      return GetPackageName(packageName.replace(modulePattern, '$1'))
    case namePattern.test(packageName):
      return packageName.replace(namePattern, '$1')
    case scopePattern.test(packageName):
      return packageName.replace(scopePattern, '$1')
    default:
      return packageName
  }
  
}
