import Path from 'path'
import Test from 'ava'
import URL from 'url'

import { Check } from '../../index.js'

const FilePath = URL.fileURLToPath(import.meta.url)
const FolderPath = Path.dirname(FilePath)
const Process = process

const ResourcePath = Path.normalize(`${FolderPath}/resource/make`)

Test.serial('Check(\'missing\', {})', async (test) => {
  Process.env['MAKEFILE_PATH'] = `${ResourcePath}/missing/makefile`
  test.deepEqual(await Check(`${ResourcePath}/missing`, {}), {
    'missing': {},
    'unused': [],
    'used': {}
  })
})

Test.serial('Check(\'unused\', {})', async (test) => {
  Process.env['MAKEFILE_PATH'] = `${ResourcePath}/unused/makefile`
  test.deepEqual(await Check(`${ResourcePath}/unused`, {}), {
    'missing': {},
    'unused': [
      'shx'
    ],
    'used': {}
  })
})

Test.serial('Check(\'used/default\', {})', async (test) => {
  Process.env['MAKEFILE_PATH'] = `${ResourcePath}/used/default/makefile`
  test.deepEqual(await Check(`${ResourcePath}/used/default`, {}), {
    'missing': {},
    'unused': [],
    'used': {
      'abc': [`${ResourcePath}/used/default/makefile`],
      'bcd': [`${ResourcePath}/used/default/makefile`],
      'cde': [`${ResourcePath}/used/default/makefile`],
      'def': [`${ResourcePath}/used/default/makefile`],
      'efg': [`${ResourcePath}/used/default/makefile`],
      'fgh': [`${ResourcePath}/used/default/makefile`],
      'ghi': [`${ResourcePath}/used/default/makefile`],
      'hij': [`${ResourcePath}/used/default/makefile`],
      'ijk': [`${ResourcePath}/used/default/makefile`],
      'jkl': [`${ResourcePath}/used/default/makefile`],
      'klm': [`${ResourcePath}/used/default/makefile`],
      'lmn': [`${ResourcePath}/used/default/makefile`]
    }
  })
})

Test.serial('Check(\'used/include\', {})', async (test) => {
  Process.env['MAKEFILE_PATH'] = `${ResourcePath}/used/include/makefile ${ResourcePath}/used/include/node_modules/shx/makefile`
  test.deepEqual(await Check(`${ResourcePath}/used/include`, {}), {
    'missing': {},
    'unused': [],
    'used': {
      'shx': [
        `${ResourcePath}/used/include/makefile`
      ]
    }
  })
})
