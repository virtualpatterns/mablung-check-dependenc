
export function GetDependencyName(dependency) {
  // e.g. from @virtualpatterns/mablung-dependency/install
  //      to   @virtualpatterns/mablung-dependency
  return dependency.replace(/(\/.*?)(\/.*)$/gi, '$1');
}
//# sourceMappingURL=get-dependency-name.js.map