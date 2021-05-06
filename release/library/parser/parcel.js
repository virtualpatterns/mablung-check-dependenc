// import Path from 'path'

export async function Parcel(filePath, packageDependency) {
  // console.log(`Parcel('${Path.relative('', filePath)}', packageDependency) { ... }`)
  // console.dir(packageDependency)

  let fileDependency = [];

  if (packageDependency.includes('parcel-bundler')) {
    fileDependency = packageDependency.filter((dependency) => /(^|\/)parcel-plugin-/gi.test(dependency));
  }

  return fileDependency;

}
//# sourceMappingURL=parcel.js.map