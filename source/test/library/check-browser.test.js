import { Check } from '@virtualpatterns/mablung-check-dependency'
import Path from 'path'
import Test from 'ava'
import URL from 'url'

const FilePath = URL.fileURLToPath(import.meta.url)
const FolderPath = Path.dirname(FilePath)

const ResourcePath = Path.normalize(Path.resolve(FolderPath, 'resource/browser'))

Test('Check(\'missing\')', async (test) => {
  test.deepEqual(await Check(Path.resolve(ResourcePath, 'missing')), { 
    'section': {
      'browser-dependency-0': {
        actual: null,
        expected: 'devDependencies'
      },
      'browser-dependency-1': {
        actual: null,
        expected: 'devDependencies'
      }
    },
    'missing': {
      'browser-dependency-0': [ Path.resolve(ResourcePath, 'missing/package.json') ],
      'browser-dependency-1': [ Path.resolve(ResourcePath, 'missing/package.json') ]
    }, 
    'unused': [],
    'used': {
      'browser-dependency-0': [ Path.resolve(ResourcePath, 'missing/package.json') ],
      'browser-dependency-1': [ Path.resolve(ResourcePath, 'missing/package.json') ]
    }
  })
})

Test('Check(\'unused\')', async (test) => {
  test.deepEqual(await Check(Path.resolve(ResourcePath, 'unused')), { 
    'section': {},
    'missing': {}, 
    'unused': [
      'browser-dependency-0',
      'browser-dependency-1'
    ],
    'used': {}
  })
})

Test('Check(\'used\')', async (test) => {
  test.deepEqual(await Check(Path.resolve(ResourcePath, 'used')), { 
    'section': {},
    'missing': {}, 
    'unused': [],
    'used': {
      'browser-dependency-0': [ Path.resolve(ResourcePath, 'used/package.json') ],
      'browser-dependency-1': [ Path.resolve(ResourcePath, 'used/package.json') ]
    }
  })
})
