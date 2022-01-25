// import { createRequire as CreateRequire } from 'module'
// import FileSystem from 'fs-extra'
// import JSON from 'jsonpath'
// import Parse from '@kba/makefile-parser'

// const Require = CreateRequire(import.meta.url)

// async function main() {

//   try {

//     // console.log(Path.resolve(FolderPath, '../../makefile'))
//     // console.log(await FileSystem.readFile(Path.resolve(FolderPath, '../../makefile'), { 'encoding': 'utf-8' }))

//     const { ast } = Parse(await FileSystem.readFile(Path.resolve(FolderPath, '../../makefile'), { 'encoding': 'utf-8' }))

//     console.dir(ast)
//     console.dir(JSON.query(ast, '$..export.value'))
//     console.dir(JSON.query(ast, '$..recipe[*]'))

//   } catch (error) {
//     console.error(error)
//   }

// }

// main()