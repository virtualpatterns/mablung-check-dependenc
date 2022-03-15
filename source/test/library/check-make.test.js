import { Check } from '@virtualpatterns/mablung-check-dependency'
import Path from 'path'
import BaseTest from 'ava'
import URL from 'url'

const FilePath = URL.fileURLToPath(import.meta.url)
const FolderPath = Path.dirname(FilePath)
const Process = process

const ResourcePath = Path.resolve(FolderPath, 'resource/make')
const Test = BaseTest.serial

Test('default', async (test) => {
  delete Process.env.MAKEFILE_PATH
  test.deepEqual(await Check(Path.resolve(ResourcePath, 'default')), {
    'missing': {},
    'section': {},
    'unused': [],
    'used': {}
  })
})

Test('Check(\'missing/installed\')', async (test) => {
  Process.env.MAKEFILE_PATH = Path.resolve(ResourcePath, 'missing/installed/makefile')
  test.deepEqual(await Check(Path.resolve(ResourcePath, 'missing/installed')), {
    'missing': {
      'package-0': [ Path.resolve(ResourcePath, 'missing/installed/makefile') ]
    },
    'section': {
      'package-0': {
        'actual': null,
        'expected': 'devDependencies'
      }
    },
    'unused': [],
    'used': {
      'package-0': [ Path.resolve(ResourcePath, 'missing/installed/makefile') ]
    }
  })
})

Test('Check(\'missing/not-installed\')', async (test) => {
  Process.env.MAKEFILE_PATH = Path.resolve(ResourcePath, 'missing/not-installed/makefile')
  test.deepEqual(await Check(Path.resolve(ResourcePath, 'missing/not-installed')), {
    'missing': {},
    'section': {},
    'unused': [],
    'used': {}
  })
})

Test('Check(\'unused\')', async (test) => {
  Process.env.MAKEFILE_PATH = Path.resolve(ResourcePath, 'unused/makefile')
  test.deepEqual(await Check(Path.resolve(ResourcePath, 'unused')), {
    'missing': {},
    'section': {},
    'unused': [
      'package-0'
    ],
    'used': {}
  })
})

Test('Check(\'used/complex\')', async (test) => {
  Process.env.MAKEFILE_PATH = Path.resolve(ResourcePath, 'used/complex/makefile')
  test.deepEqual(await Check(Path.resolve(ResourcePath, 'used/complex')), {
    'missing': {},
    'section': {},
    'unused': [],
    'used': {
      'package-00': [ Path.resolve(ResourcePath, 'used/complex/makefile') ],
      'package-01': [ Path.resolve(ResourcePath, 'used/complex/makefile') ],
      'package-02': [ Path.resolve(ResourcePath, 'used/complex/makefile') ],
      'package-03': [ Path.resolve(ResourcePath, 'used/complex/makefile') ],
      'package-04': [ Path.resolve(ResourcePath, 'used/complex/makefile') ],
      'package-05': [ Path.resolve(ResourcePath, 'used/complex/makefile') ],
      'package-06': [ Path.resolve(ResourcePath, 'used/complex/makefile') ],
      'package-07': [ Path.resolve(ResourcePath, 'used/complex/makefile') ],
      'package-08': [ Path.resolve(ResourcePath, 'used/complex/makefile') ],
      'package-09': [ Path.resolve(ResourcePath, 'used/complex/makefile') ],
      'package-10': [ Path.resolve(ResourcePath, 'used/complex/makefile') ]
    }
  })
})

Test('Check(\'used/include\')', async (test) => {

  Process.env.MAKEFILE_PATH = [
    Path.resolve(ResourcePath, 'used/include/makefile'),
    Path.resolve(ResourcePath, 'used/include/included')
  ].join(' ')

  test.deepEqual(await Check(Path.resolve(ResourcePath, 'used/include')), {
    'missing': {},
    'section': {},
    'unused': [],
    'used': {
      'package-0': [ Path.resolve(ResourcePath, 'used/include/included') ]
    }
  })
  
}) 

Test('Check(\'used/simple\')', async (test) => {
  Process.env.MAKEFILE_PATH = Path.resolve(ResourcePath, 'used/simple/makefile')
  test.deepEqual(await Check(Path.resolve(ResourcePath, 'used/simple')), {
    'missing': {},
    'section': {},
    'unused': [],
    'used': {
      'package-0': [ Path.resolve(ResourcePath, 'used/simple/makefile') ],
      'package-1': [ Path.resolve(ResourcePath, 'used/simple/makefile') ]
    }
  })
})
