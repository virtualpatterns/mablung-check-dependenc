import Path from 'path'
import Test from 'ava'
import URL from 'url'

import { Check } from '../../index.js'

const FilePath = URL.fileURLToPath(import.meta.url)
const FolderPath = Path.dirname(FilePath)

const ResourcePath = Path.normalize(`${FolderPath}/resource/unused`)

Test('Check(\'dependency\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/dependency`), { 
    'missing': {}, 
    'unused': [ '@virtualpatterns/mablung-dependency' ], 
    'used': {} 
  })
})

Test('Check(\'development-dependency\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/development-dependency`), { 
    'missing': {}, 
    'unused': [ '@virtualpatterns/mablung-development-dependency' ], 
    'used': {} 
  })
})
