import Path from 'path'
import Test from 'ava'
import { Check } from '@virtualpatterns/mablung-check-dependency'
import URL from 'url'

const FilePath = URL.fileURLToPath(import.meta.url)
const FolderPath = Path.dirname(FilePath)

const ResourcePath = Path.normalize(`${FolderPath}/resource/browser`)

Test('Check(\'missing\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/missing`, {}), { 
    'missing': {
      'browser-dependency-0': [ `${ResourcePath}/missing/package.json` ],
      'browser-dependency-1': [ `${ResourcePath}/missing/package.json` ]
    }, 
    'unused': [],
    'used': {
      'browser-dependency-0': [ `${ResourcePath}/missing/package.json` ],
      'browser-dependency-1': [ `${ResourcePath}/missing/package.json` ]
    }
  })
})

Test('Check(\'unused\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/unused`, {}), { 
    'missing': {}, 
    'unused': [
      'browser-dependency-0',
      'browser-dependency-1'
    ],
    'used': {}
  })
})

Test('Check(\'used\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/used`, {}), { 
    'missing': {}, 
    'unused': [],
    'used': {
      'browser-dependency-0': [ `${ResourcePath}/used/package.json` ],
      'browser-dependency-1': [ `${ResourcePath}/used/package.json` ]
    }
  })
})
