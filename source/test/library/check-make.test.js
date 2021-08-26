import Path from 'path'
import BaseTest from 'ava'
import URL from 'url'

import { Check } from '../../index.js'

const FilePath = URL.fileURLToPath(import.meta.url)
const FolderPath = Path.dirname(FilePath)
const Process = process
const Test = BaseTest.serial

const ResourcePath = `${FolderPath}/resource/make`

Test('default', async (test) => {
  delete Process.env.MAKEFILE_PATH
  test.deepEqual(await Check(`${ResourcePath}/missing/installed`), {
    'missing': {},
    'unused': [],
    'used': {}
  })
})

Test('Check(\'missing/installed\')', async (test) => {
  Process.env.MAKEFILE_PATH = `${ResourcePath}/missing/installed/makefile`
  test.deepEqual(await Check(`${ResourcePath}/missing/installed`), {
    'missing': {
      'dependency-0': [ `${ResourcePath}/missing/installed/makefile` ]
    },
    'unused': [],
    'used': {
      'dependency-0': [ `${ResourcePath}/missing/installed/makefile` ]
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
      'dependency-0'
    ],
    'used': {}
  })
})

Test('Check(\'used/simple\')', async (test) => {
  Process.env.MAKEFILE_PATH = `${ResourcePath}/used/simple/makefile`
  test.deepEqual(await Check(`${ResourcePath}/used/simple`), {
    'missing': {},
    'unused': [],
    'used': {
      'dependency-0': [ `${ResourcePath}/used/simple/makefile` ],
      'dependency-1': [ `${ResourcePath}/used/simple/makefile` ]
    }
  })
})

Test('Check(\'used/complex\')', async (test) => {
  Process.env.MAKEFILE_PATH = `${ResourcePath}/used/complex/makefile`
  test.deepEqual(await Check(`${ResourcePath}/used/complex`), {
    'missing': {},
    'unused': [],
    'used': {
      'dependency-00': [ `${ResourcePath}/used/complex/makefile` ],
      'dependency-01': [ `${ResourcePath}/used/complex/makefile` ],
      'dependency-02': [ `${ResourcePath}/used/complex/makefile` ],
      'dependency-03': [ `${ResourcePath}/used/complex/makefile` ],
      'dependency-04': [ `${ResourcePath}/used/complex/makefile` ],
      'dependency-05': [ `${ResourcePath}/used/complex/makefile` ],
      'dependency-06': [ `${ResourcePath}/used/complex/makefile` ],
      'dependency-07': [ `${ResourcePath}/used/complex/makefile` ],
      'dependency-08': [ `${ResourcePath}/used/complex/makefile` ],
      'dependency-09': [ `${ResourcePath}/used/complex/makefile` ],
      'dependency-10': [ `${ResourcePath}/used/complex/makefile` ],
      'dependency-11': [ `${ResourcePath}/used/complex/makefile` ]
    }
  })
})

Test('Check(\'used/include\')', async (test) => {
  Process.env.MAKEFILE_PATH = `${ResourcePath}/used/include/makefile ${ResourcePath}/used/include/included`
  test.deepEqual(await Check(`${ResourcePath}/used/include`), {
    'missing': {},
    'unused': [],
    'used': {
      'dependency-0': [ `${ResourcePath}/used/include/included` ]
    }
  })
})
