import { Check, FileParseError, FolderParseError } from '@virtualpatterns/mablung-check-dependency'
import Path from 'path'
import Shell from 'shelljs'
import Test from 'ava'
import URL from 'url'

const FilePath = URL.fileURLToPath(import.meta.url)
const FolderPath = Path.dirname(FilePath)

const ResourcePath = Path.normalize(Path.resolve(FolderPath, 'resource'))

Test('Check(\'default\')', async (test) => {
  test.deepEqual(await Check(Path.resolve(ResourcePath, 'default')), {
    'missing': {},
    'unused': [],
    'used': {
      'some-package': [Path.resolve(ResourcePath, 'default/default.js')]
    }
  })
})

Test('Check(\'ignore-match\', { ignoreMatch: [ ... ] })', async (test) => {
  test.deepEqual(await Check(Path.resolve(ResourcePath, 'ignore-match'), { 'ignoreMatch': [ 'ignore-dependency-0' ] }), { 
    'missing': {}, 
    'unused': [],
    'used': {}
  })
})

Test('Check(\'ignore-pattern\', { ignorePattern: [ ... ] })', async (test) => {
  test.deepEqual(await Check(Path.resolve(ResourcePath, 'ignore-pattern'), { 'ignorePattern': [ 'ignore-pattern.js' ] }), { 
    'missing': {}, 
    'unused': [
      'ignore-dependency-0'
    ],
    'used': {}
  })
})

Test('Check(\'folder-parse-error\') throws FolderParseError', async (test) => {

  Shell.chmod('ugo-rwx', Path.resolve(ResourcePath, 'folder-parse-error/folder'))

  try {
    await test.throwsAsync(Check(Path.resolve(ResourcePath, 'folder-parse-error')), { 'instanceOf': FolderParseError })
  } finally {
    Shell.chmod('ugo+rwx', Path.resolve(ResourcePath, 'folder-parse-error/folder'))
  }

})

Test('Check(\'file-parse-error\') throws FileParseError', (test) => {
  return test.throwsAsync(Check(Path.resolve(ResourcePath, 'file-parse-error')), { 'instanceOf': FileParseError })
})

Test('Check(\'missing\')', async (test) => {
  test.deepEqual(await Check(Path.resolve(ResourcePath, 'missing')), {
    'missing': {
      'missing-dependency-0': [Path.resolve(ResourcePath, 'missing/missing.js')]
    },
    'unused': [],
    'used': {
      'missing-dependency-0': [Path.resolve(ResourcePath, 'missing/missing.js')]
    }
  })
})

Test('Check(\'unused\')', async (test) => {
  test.deepEqual(await Check(Path.resolve(ResourcePath, 'unused')), {
    'missing': {},
    'unused': [
      'unused-dependency-0',
      'unused-dependency-1'
    ],
    'used': {}
  })
})

Test('Check(\'used\')', async (test) => {
  test.deepEqual(await Check(Path.resolve(ResourcePath, 'used')), {
    'missing': {},
    'unused': [],
    'used': {
      'used-dependency-0': [Path.resolve(ResourcePath, 'used/used.js')],
      'used-dependency-1': [Path.resolve(ResourcePath, 'used/used.js')]
    }
  })
})
