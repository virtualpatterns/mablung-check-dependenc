import { Check } from '@virtualpatterns/mablung-check-dependency'
import Path from 'path'
import Test from 'ava'
import URL from 'url'

const FilePath = URL.fileURLToPath(import.meta.url)
const FolderPath = Path.dirname(FilePath)

const ResourcePath = Path.resolve(FolderPath, 'resource/ava')

Test('Check(\'missing\')', async (test) => {
  test.deepEqual(await Check(Path.resolve(ResourcePath, 'missing')), { 
    'missing': {
      '@virtualpatterns/mablung-source-map-support': [ Path.resolve(ResourcePath, 'missing/ava.config.js') ]
    },
    'unused': [],
    'used': {
      '@virtualpatterns/mablung-source-map-support': [ Path.resolve(ResourcePath, 'missing/ava.config.js') ]
    }
  })
})

Test('Check(\'unused\')', async (test) => {
  test.deepEqual(await Check(Path.resolve(ResourcePath, 'unused')), { 
    'missing': {}, 
    'unused': [
      '@virtualpatterns/mablung-source-map-support'
    ],
    'used': {}
  })
})

Test('Check(\'used\')', async (test) => {
  test.deepEqual(await Check(Path.resolve(ResourcePath, 'used')), { 
    'missing': {}, 
    'unused': [],
    'used': {
      '@virtualpatterns/mablung-source-map-support': [ Path.resolve(ResourcePath, 'used/ava.config.js') ]
    }
  })
})
