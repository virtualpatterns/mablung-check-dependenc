import Path from 'path'
import Test from 'ava'
import URL from 'url'

import { Check } from '../../index.js'

const FilePath = URL.fileURLToPath(import.meta.url)
const FolderPath = Path.dirname(FilePath)
const Process = process

const ResourcePath = Path.normalize(`${FolderPath}/resource/make`)

Test.serial('Check(\'makefile/missing\', {})', async (test) => {
  Process.env['MAKEFILE_PATH'] = `${ResourcePath}/makefile/missing/makefile`
  test.deepEqual(await Check(`${ResourcePath}/makefile/missing`, {}), {
    'missing': {},
    'unused': [],
    'used': {}
  })
})

Test.serial('Check(\'makefile/unused\', {})', async (test) => {
  Process.env['MAKEFILE_PATH'] = `${ResourcePath}/makefile/unused/makefile`
  test.deepEqual(await Check(`${ResourcePath}/makefile/unused`, {}), {
    'missing': {},
    'unused': [
      'shx'
    ],
    'used': {}
  })
})

Test.serial('Check(\'makefile/used/default\', {})', async (test) => {
  Process.env['MAKEFILE_PATH'] = `${ResourcePath}/makefile/used/default/makefile`
  test.deepEqual(await Check(`${ResourcePath}/makefile/used/default`, {}), {
    'missing': {},
    'unused': [],
    'used': {
      'abc': [`${ResourcePath}/makefile/used/default/makefile`],
      'bcd': [`${ResourcePath}/makefile/used/default/makefile`],
      'cde': [`${ResourcePath}/makefile/used/default/makefile`],
      'def': [`${ResourcePath}/makefile/used/default/makefile`],
      'efg': [`${ResourcePath}/makefile/used/default/makefile`],
      'fgh': [`${ResourcePath}/makefile/used/default/makefile`],
      'ghi': [`${ResourcePath}/makefile/used/default/makefile`],
      'hij': [`${ResourcePath}/makefile/used/default/makefile`],
      'ijk': [`${ResourcePath}/makefile/used/default/makefile`],
      'jkl': [`${ResourcePath}/makefile/used/default/makefile`],
      'klm': [`${ResourcePath}/makefile/used/default/makefile`],
      'lmn': [`${ResourcePath}/makefile/used/default/makefile`]
    }
  })
})

Test.serial('Check(\'makefile/used/include\', {})', async (test) => {
  Process.env['MAKEFILE_PATH'] = `${ResourcePath}/makefile/used/include/makefile ${ResourcePath}/makefile/used/include/node_modules/shx/makefile`
  test.deepEqual(await Check(`${ResourcePath}/makefile/used/include`, {}), {
    'missing': {},
    'unused': [],
    'used': {
      'shx': [
        `${ResourcePath}/makefile/used/include/makefile`
      ]
    }
  })
})
