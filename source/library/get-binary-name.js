
const scopePattern = /^@.+?\/(.+)$/

export function GetBinaryName(packageName) {

  switch (true) {
    case scopePattern.test(packageName):
      return packageName.replace(scopePattern, '$1')
    default:
      return packageName
  }
  
}
