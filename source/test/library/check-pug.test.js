import { Check } from '@virtualpatterns/mablung-check-dependency'
import Path from 'path'
import Test from 'ava'
import URL from 'url'

const FilePath = URL.fileURLToPath(import.meta.url)
const FolderPath = Path.dirname(FilePath)

const ResourcePath = Path.normalize(Path.resolve(FolderPath, 'resource/pug'))

// missing

Test('Check(\'missing/filter\')', async (test) => {
  test.deepEqual(await Check(Path.resolve(ResourcePath, 'missing/filter')), { 
    'missing': { 
      'jstransformer-markdown-it': [ Path.resolve(ResourcePath, 'missing/filter/template.pug') ] 
    },
    'section': {
      'jstransformer-markdown-it': {
        'actual': null,
        'expected': 'devDependencies'
      }
    },
    'unused': [],
    'used': { 
      'jstransformer-markdown-it': [ Path.resolve(ResourcePath, 'missing/filter/template.pug') ] 
    }
  })
})

Test('Check(\'missing/filter-and-filter-include\')', async (test) => {
  test.deepEqual(await Check(Path.resolve(ResourcePath, 'missing/filter-and-filter-include')), { 
    'missing': { 
      'jstransformer-coffee-script': [ Path.resolve(ResourcePath, 'missing/filter-and-filter-include/template.pug') ],
      'jstransformer-markdown-it': [ Path.resolve(ResourcePath, 'missing/filter-and-filter-include/template.pug') ] 
    }, 
    'section': {
      'jstransformer-coffee-script': {
        'actual': null,
        'expected': 'devDependencies'
      },
      'jstransformer-markdown-it': {
        'actual': null,
        'expected': 'devDependencies'
      }
    },
    'unused': [],
    'used': { 
      'jstransformer-coffee-script': [ Path.resolve(ResourcePath, 'missing/filter-and-filter-include/template.pug') ],
      'jstransformer-markdown-it': [ Path.resolve(ResourcePath, 'missing/filter-and-filter-include/template.pug') ] 
    }
  })
})

Test('Check(\'missing/filter-include\')', async (test) => {
  test.deepEqual(await Check(Path.resolve(ResourcePath, 'missing/filter-include')), { 
    'missing': { 
      'jstransformer-markdown-it': [ Path.resolve(ResourcePath, 'missing/filter-include/template.pug') ] 
    },
    'section': {
      'jstransformer-markdown-it': {
        'actual': null,
        'expected': 'devDependencies'
      }
    },
    'unused': [],
    'used': { 
      'jstransformer-markdown-it': [ Path.resolve(ResourcePath, 'missing/filter-include/template.pug') ] 
    }
  })
})

Test('Check(\'missing/no-filter\')', async (test) => {
  test.deepEqual(await Check(Path.resolve(ResourcePath, 'missing/no-filter')), { 
    'missing': {}, 
    'section': {},
    'unused': [],
    'used': {}
  })
})

// unused

Test('Check(\'unused/no-filter\')', async (test) => {
  test.deepEqual(await Check(Path.resolve(ResourcePath, 'unused/no-filter')), { 
    'missing': {},
    'section': {},
    'unused': [
      'jstransformer-markdown-it'
    ],
    'used': {}
  })
})

// used

Test('Check(\'used/filter\')', async (test) => {
  test.deepEqual(await Check(Path.resolve(ResourcePath, 'used/filter')), { 
    'missing': {},
    'section': {},
    'unused': [],
    'used': { 
      'jstransformer-markdown-it': [ Path.resolve(ResourcePath, 'used/filter/template.pug') ]
    }
  })
})

Test('Check(\'used/filter-and-filter-include\')', async (test) => {
  test.deepEqual(await Check(Path.resolve(ResourcePath, 'used/filter-and-filter-include')), { 
    'missing': {}, 
    'section': {},
    'unused': [],
    'used': { 
      'jstransformer-coffee-script': [ Path.resolve(ResourcePath, 'used/filter-and-filter-include/template.pug') ],
      'jstransformer-markdown-it': [ Path.resolve(ResourcePath, 'used/filter-and-filter-include/template.pug') ] 
    }
  })
})

Test('Check(\'used/filter-include\')', async (test) => {
  test.deepEqual(await Check(Path.resolve(ResourcePath, 'used/filter-include')), { 
    'missing': {}, 
    'section': {},
    'unused': [],
    'used': { 
      'jstransformer-markdown-it': [ Path.resolve(ResourcePath, 'used/filter-include/template.pug') ] 
    }
  })
})
