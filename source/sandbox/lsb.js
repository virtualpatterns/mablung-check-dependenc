// import { createRequire as CreateRequire } from 'module'
// import FileSystem from 'fs-extra'
// import Find from 'find'
// import JSON5 from 'json5'
// import Path from 'path'
// import URL from 'url'

// // import Parse from '@kba/makefile-parser'

// const FilePath = URL.fileURLToPath(import.meta.url)
// const FolderPath = Path.dirname(FilePath)
// const Process = process
// // const Require = CreateRequire(import.meta.url)

// async function main() {

//   try {

//     let packagePath = Find.fileSync(/package\.json$/, `${Process.cwd()}/node_modules`)
      
//     for (let path of packagePath) {

//       // console.log(path)

//       let { name, bin: binary } = JSON5.parse(await FileSystem.readFile(path, { 'encoding': 'utf-8' }))

//       if (binary !== undefined) {

//         if (typeof binary === 'string') {
//           console.dir({
//             'packageName': name,
//             'binaryName': name
//           })
//         } else {

//           for (let property in binary) {
//             console.dir({
//               'packageName': name,
//               'binaryName': property
//             })
//           }

//         }

//       }

//     }

//     // get bin dir ... cd dir in arg, npm bin
//     // get contents of bin ... []

//     // console.dir(getPackagePath(`${FolderPath}/lsbd/a`))
//     // console.dir(await getBinary(`${FolderPath}/lsbd`))
//     // console.dir(await getBinary(`${Process.cwd()}/node_modules`))

//     // get each bin in node-mod/.bin
//     // find all package.j with bin = bin
//     // get "name" = "@virtualpatterns/mablung-check-dependency" from package.j

//     // foreach bin, if bin exists in recipe, package is dep

//   } catch (error) {
//     console.error(error)
//   }

// }

// async function getPackagePath(path = `${Process.cwd()}/node_modules`) {

//   let item = await FileSystem.readdir(path, { 'encoding': 'utf-8', 'withFileTypes': true })
//   let promise = []

//   promise.concat(item
//     .filter((item) => item.isDirectory())
//     .map((item) => getPackagePath(`${path}/${item.name}`).then((result) => result.flat())))
  
//   promise.concat(item
//     .filter((item) => item.isFile() && item.name === 'package.json')
//     .map((item) => `${path}/${item.name}`))
  
//   console.dir(promise)
  
//   return Promise.all(promise)

// }

// async function getBinary(path) {
//   // console.log(`getBinary('${path}')`)

//   let information = await FileSystem.stat(path)

//   if (information.isFile()) {

//     let { name, bin } = JSON5.parse(await FileSystem.readFile(path, { 'encoding': 'utf-8' }))

//     return { name, bin }

//   } else {

//     let item = await FileSystem.readdir(path, { 'encoding': 'utf-8', 'withFileTypes': true })
    
//     return (await Promise.all(item
//       .filter((item) => item.isDirectory() || (item.isFile() && item.name === 'package.json'))
//       .map((item) => getBinary(`${path}/${item.name}`)))).flat()
    
//   }

//   // let promise = []
//   // let item = await FileSystem.readdir(path, { 'encoding': 'utf-8', 'withFileTypes': true })

//   // promise.concat(item
//   //   .filter((item) => item.isDirectory())
//   //   .map((directory) => getBinary(`${path}/${directory.name}`)))

//   // promise.concat(item
//   //   .filter((item) => item.isFile())
//   //   .filter((file) => file.name == 'package.json')
//   //   .map((file) => JSON5.parse(FileSystem.readFileSync(path, { 'encoding': 'utf-8' }))))

//   // return Promise.all(promise)

// }



// main()