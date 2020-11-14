
const dotPattern = /^.{1,2}\//
const namePattern = /^([^@].*?)\/.*/
const scopePattern = /^(@.*?\/.*?)\/.*/

export function GetDependencyName(dependency) {

  // return dependency.replace(/^(@.*?\/.*?)(\/.*)$/, '$1') // /([^.{1,2}]\/.*?)(\/.*)$/gi, '$1')

  switch (true) {
    case dotPattern.test(dependency):
      return dependency
    case namePattern.test(dependency):
      return dependency.replace(namePattern, '$1')
    case scopePattern.test(dependency):
      return dependency.replace(scopePattern, '$1')
    default:
      return dependency
  }
  
}
