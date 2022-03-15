import { Check } from '@virtualpatterns/mablung-check-dependency'
import Path from 'path'
import Test from 'ava'
import URL from 'url'

const FilePath = URL.fileURLToPath(import.meta.url)
const FolderPath = Path.dirname(FilePath)

const ResourcePath = Path.normalize(Path.resolve(FolderPath, 'resource/section'))

Test('Check(\'match/default\')', async (test) => {
  test.deepEqual(await Check(Path.resolve(ResourcePath, 'match/default')), { 
    'missing': {}, 
    'section': {},
    'unused': [],
    'used': {
      'dependency-0': [ Path.resolve(ResourcePath, 'match/default/match.js') ]
    }
  })
})

Test('Check(\'match/sandbox/default\')', async (test) => {
  test.deepEqual(await Check(Path.resolve(ResourcePath, 'match/sandbox/default')), { 
    'missing': {}, 
    'section': {},
    'unused': [],
    'used': {
      'dependency-0': [ Path.resolve(ResourcePath, 'match/sandbox/default/source/sandbox/match.js') ]
    }
  })
})

Test('Check(\'match/sandbox/esmodule\')', async (test) => {
  test.deepEqual(await Check(Path.resolve(ResourcePath, 'match/sandbox/esmodule')), { 
    'missing': {}, 
    'section': {},
    'unused': [],
    'used': {
      'dependency-0': [ Path.resolve(ResourcePath, 'match/sandbox/esmodule/source/esmodule/sandbox/match.js') ]
    }
  })
})

Test('Check(\'match/test/default\')', async (test) => {
  test.deepEqual(await Check(Path.resolve(ResourcePath, 'match/test/default')), { 
    'missing': {}, 
    'section': {},
    'unused': [],
    'used': {
      'dependency-0': [ Path.resolve(ResourcePath, 'match/test/default/source/test/match.js') ]
    }
  })
})

Test('Check(\'match/test/esmodule\')', async (test) => {
  test.deepEqual(await Check(Path.resolve(ResourcePath, 'match/test/esmodule')), { 
    'missing': {}, 
    'section': {},
    'unused': [],
    'used': {
      'dependency-0': [ Path.resolve(ResourcePath, 'match/test/esmodule/source/esmodule/test/match.js') ]
    }
  })
})

Test('Check(\'match/source\')', async (test) => {
  test.deepEqual(await Check(Path.resolve(ResourcePath, 'match/source')), { 
    'missing': {}, 
    'section': {},
    'unused': [],
    'used': {
      'dependency-0': [ Path.resolve(ResourcePath, 'match/source/source/match.js') ]
    }
  })
})

Test('Check(\'mis-match/default\')', async (test) => {
  test.deepEqual(await Check(Path.resolve(ResourcePath, 'mis-match/default')), { 
    'missing': {}, 
    'section': {
      'dependency-0': {
        actual: 'dependencies',
        expected: 'devDependencies'
      }
    },
    'unused': [],
    'used': {
      'dependency-0': [ Path.resolve(ResourcePath, 'mis-match/default/mis-match.js') ]
    }
  })
})

Test('Check(\'mis-match/sandbox/default\')', async (test) => {
  test.deepEqual(await Check(Path.resolve(ResourcePath, 'mis-match/sandbox/default')), { 
    'missing': {}, 
    'section': {
      'dependency-0': {
        actual: 'dependencies',
        expected: 'devDependencies'
      }
    },
    'unused': [],
    'used': {
      'dependency-0': [ Path.resolve(ResourcePath, 'mis-match/sandbox/default/source/sandbox/mis-match.js') ]
    }
  })
})

Test('Check(\'mis-match/sandbox/esmodule\')', async (test) => {
  test.deepEqual(await Check(Path.resolve(ResourcePath, 'mis-match/sandbox/esmodule')), { 
    'missing': {}, 
    'section': {
      'dependency-0': {
        actual: 'dependencies',
        expected: 'devDependencies'
      }
    },
    'unused': [],
    'used': {
      'dependency-0': [ Path.resolve(ResourcePath, 'mis-match/sandbox/esmodule/source/esmodule/sandbox/mis-match.js') ]
    }
  })
})

Test('Check(\'mis-match/test/default\')', async (test) => {
  test.deepEqual(await Check(Path.resolve(ResourcePath, 'mis-match/test/default')), { 
    'missing': {}, 
    'section': {
      'dependency-0': {
        actual: 'dependencies',
        expected: 'devDependencies'
      }
    },
    'unused': [],
    'used': {
      'dependency-0': [ Path.resolve(ResourcePath, 'mis-match/test/default/source/test/mis-match.js') ]
    }
  })
})

Test('Check(\'mis-match/test/esmodule\')', async (test) => {
  test.deepEqual(await Check(Path.resolve(ResourcePath, 'mis-match/test/esmodule')), { 
    'missing': {}, 
    'section': {
      'dependency-0': {
        actual: 'dependencies',
        expected: 'devDependencies'
      }
    },
    'unused': [],
    'used': {
      'dependency-0': [ Path.resolve(ResourcePath, 'mis-match/test/esmodule/source/esmodule/test/mis-match.js') ]
    }
  })
})

Test('Check(\'mis-match/source\')', async (test) => {
  test.deepEqual(await Check(Path.resolve(ResourcePath, 'mis-match/source')), { 
    'missing': {}, 
    'section': {
      'dependency-0': {
        actual: 'devDependencies',
        expected: 'dependencies'
      }
    },
    'unused': [],
    'used': {
      'dependency-0': [ Path.resolve(ResourcePath, 'mis-match/source/source/mis-match.js') ]
    }
  })
})
