import { Check } from '@virtualpatterns/mablung-check-dependency'
import Path from 'path'
import Test from 'ava'
import URL from 'url'

const FilePath = URL.fileURLToPath(import.meta.url)
const FolderPath = Path.dirname(FilePath)

const ResourcePath = `${FolderPath}/resource/ava`

Test('Check(\'missing\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/missing`), { 
    'missing': {
      '@virtualpatterns/mablung-source-map-support': [ `${ResourcePath}/missing/ava.config.cjs` ]
    },
    'unused': [],
    'used': {
      '@virtualpatterns/mablung-source-map-support': [ `${ResourcePath}/missing/ava.config.cjs` ]
    }
  })
})

Test('Check(\'unused\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/unused`), { 
    'missing': {}, 
    'unused': [
      '@virtualpatterns/mablung-source-map-support'
    ],
    'used': {}
  })
})

Test('Check(\'used\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/used`), { 
    'missing': {}, 
    'unused': [],
    'used': {
      '@virtualpatterns/mablung-source-map-support': [ `${ResourcePath}/used/ava.config.cjs` ]
    }
  })
})
