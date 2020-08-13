
export async function Parcel(filePath, packageDependency) {
  // console.log(`Parcel('${Path.relative('', filePath, packageDependency)}') { ... }`)
  // console.dir(packageDependency)

  let fileDependency = [];
  let pattern = /(^|\/)parcel-plugin-/gi;

  if (packageDependency.includes('parcel-bundler')) {
    fileDependency = packageDependency.filter(packageDependency => pattern.test(packageDependency));
  }

  return fileDependency;

}
//# sourceMappingURL=parcel.js.map