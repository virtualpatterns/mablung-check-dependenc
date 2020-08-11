
export function GetDependencyName(dependency) {
  // e.g. from @virtualpatterns/mablung-dependency/install
  //      to   @virtualpatterns/mablung-dependency
  return dependency.replace(/(\/.*?)(\/.*)$/gi, '$1')
}