import { Check } from '@virtualpatterns/mablung-check-dependency'
import Path from 'path'
import BaseTest from 'ava'
import URL from 'url'

const FilePath = URL.fileURLToPath(import.meta.url)
const FolderPath = Path.dirname(FilePath)
const Process = process

const ResourcePath = `${FolderPath}/resource/make`
const Test = BaseTest.serial

Test('default', async (test) => {
  delete Process.env.MAKEFILE_PATH
  test.deepEqual(await Check(`${ResourcePath}/default`), {
    'missing': {},
    'unused': [],
    'used': {}
  })
})

Test('Check(\'missing/installed\')', async (test) => {
  Process.env.MAKEFILE_PATH = `${ResourcePath}/missing/installed/makefile`
  test.deepEqual(await Check(`${ResourcePath}/missing/installed`), {
    'missing': {
      'package-0': [ `${ResourcePath}/missing/installed/makefile` ]
    },
    'unused': [],
    'used': {
      'package-0': [ `${ResourcePath}/missing/installed/makefile` ]
    }
  })
})

Test('Check(\'missing/not-installed\')', async (test) => {
  Process.env.MAKEFILE_PATH = `${ResourcePath}/missing/not-installed/makefile`
  test.deepEqual(await Check(`${ResourcePath}/missing/not-installed`), {
    'missing': {},
    'unused': [],
    'used': {}
  })
})

Test('Check(\'unused\')', async (test) => {
  Process.env.MAKEFILE_PATH = `${ResourcePath}/unused/makefile`
  test.deepEqual(await Check(`${ResourcePath}/unused`), {
    'missing': {},
    'unused': [
      'package-0'
    ],
    'used': {}
  })
})

Test('Check(\'used/complex\')', async (test) => {
  Process.env.MAKEFILE_PATH = `${ResourcePath}/used/complex/makefile`
  test.deepEqual(await Check(`${ResourcePath}/used/complex`), {
    'missing': {},
    'unused': [],
    'used': {
      'package-00': [`${ResourcePath}/used/complex/makefile`],
      'package-01': [`${ResourcePath}/used/complex/makefile`],
      'package-02': [`${ResourcePath}/used/complex/makefile`],
      'package-03': [`${ResourcePath}/used/complex/makefile`],
      'package-04': [`${ResourcePath}/used/complex/makefile`],
      'package-05': [`${ResourcePath}/used/complex/makefile`],
      'package-06': [`${ResourcePath}/used/complex/makefile`],
      'package-07': [`${ResourcePath}/used/complex/makefile`],
      'package-08': [`${ResourcePath}/used/complex/makefile`],
      'package-09': [`${ResourcePath}/used/complex/makefile`],
      'package-10': [`${ResourcePath}/used/complex/makefile`]
    }
  })
})

Test('Check(\'used/include\')', async (test) => {
  Process.env.MAKEFILE_PATH = `${ResourcePath}/used/include/makefile ${ResourcePath}/used/include/included`
  test.deepEqual(await Check(`${ResourcePath}/used/include`), {
    'missing': {},
    'unused': [],
    'used': {
      'package-0': [`${ResourcePath}/used/include/included`]
    }
  })
})

Test('Check(\'used/simple\')', async (test) => {
  Process.env.MAKEFILE_PATH = `${ResourcePath}/used/simple/makefile`
  test.deepEqual(await Check(`${ResourcePath}/used/simple`), {
    'missing': {},
    'unused': [],
    'used': {
      'package-0': [ `${ResourcePath}/used/simple/makefile` ],
      'package-1': [ `${ResourcePath}/used/simple/makefile` ]
    }
  })
})
