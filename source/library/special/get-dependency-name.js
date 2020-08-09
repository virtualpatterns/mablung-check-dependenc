
export function GetDependencyName(dependency) {
  // console.log(`GetDependencyName('${dependency}') { ... }`)
  return dependency.replace(/(\/.*?)(\/.*?)$/gi, '$1')
}