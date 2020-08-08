// import '@virtualpatterns/mablung-source-map-support/install'
import Check from 'depcheck'
// import FileSystem from 'fs-extra'
// import Is from '@pwn/is'
// import JSON5 from 'json5'
// import Match from 'minimatch'
// import Path from 'path'
// import Query from 'jsonpath'

// const FilePath = __filePath
// const FolderPath = Path.dirname(FilePath)
const Process = process

// function parseAvaFromPackage(filePath) {

//   console.log(`content = '${content}'`)

//   // let Package = JSON5.parse(content)
//   // let ava = Package.ava
//   // let dependencyName = ava.require

//   // return dependencyName

// }

// async function parseStaticBabelConfiguration(filePath) {
//   // console.log(`parseStaticBabelConfiguration('${Path.relative('', filePath)}') { ... }`)

//   let dependency = []

//   let fileName = Path.basename(filePath)
//   let pattern = [ 'package.json', 'babel.config.json', '.babelrc.json', 'poop*.json' ]

//   if (pattern.reduce((isMatch, pattern) => isMatch ? isMatch : Match(fileName, pattern, { 'dot': true }), false)) {

//     let configuration = null
//     configuration = JSON5.parse(await FileSystem.readFile(filePath, { 'encoding': 'utf-8' }))
//     configuration = fileName === 'package.json' ? (configuration.babel || {}) : configuration

//     let plugin = null
//     plugin = Query.query(configuration, '$..plugins[*]')
//     plugin = plugin.filter((plugin) => Is.array(plugin) || plugin !== 'importMeta')
//     plugin = plugin.map((plugin) => Is.array(plugin) ? plugin[0] : plugin)

//     let preset = null
//     preset = Query.query(configuration, '$..presets[*]')
//     preset = preset.map((preset) => Is.array(preset) ? preset[0] : preset)

//     dependency = [...plugin, ...preset]

//   }

//   return dependency

// }

async function main() {

  try {

    let option = {
      'ignorePatterns': [
        'distributable'
      ],
      'parsers': {
        '*.js': Check.parser.es7.default,
        '*.cjs': Check.parser.es6
      },
      'special': [
        Check.special.bin,
        Check.special.eslint
      ]
    }

    Check(Process.cwd(), option, (unused) => {
      console.dir(unused.dependencies) // an array containing the unused dependencies
      console.dir(unused.devDependencies) // an array containing the unused devDependencies
      console.dir(unused.missing) // a lookup containing the dependencies missing in `package.json` and where they are used
      // console.dir(unused.using) // a lookup indicating each dependency is used by which files
      console.dir(unused.invalidFiles) // files that cannot access or parse
      console.dir(unused.invalidDirs) // directories that cannot access
    })

  } catch (error) {
    console.error(error)
  }

}

main()