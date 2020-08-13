import Path from 'path'
import Test from 'ava'
import URL from 'url'

import { Check } from '../../index.js'

const FilePath = URL.fileURLToPath(import.meta.url)
const FolderPath = Path.dirname(FilePath)

// the resources in source are used because 
// babel doesn't copy dot files (e.g. .babelrc.json)
const ResourcePath = Path.normalize(`${FolderPath}/../../../source/test/library/resource`)

Test('Check(\'unused/dependency\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/unused/dependency`), { 
    'missing': {}, 
    'unused': [ '@virtualpatterns/mablung-dependency' ], 
    'used': {} 
  })
})

Test('Check(\'unused/development-dependency\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/unused/development-dependency`), { 
    'missing': {}, 
    'unused': [ '@virtualpatterns/mablung-development-dependency' ], 
    'used': {} 
  })
})

Test('Check(\'unused/parcel\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/unused/parcel`), { 
    'missing': {}, 
    'unused': [
      '@virtualpatterns/parcel-plugin-dependency',
      'parcel-plugin-dependency'
    ],
    'used': {}
  })
})

Test('Check(\'unused/pug\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/unused/pug`), { 
    'missing': {}, 
    'unused': [
      'jstransformer-markdown-it'
    ],
    'used': {}
  })
})
