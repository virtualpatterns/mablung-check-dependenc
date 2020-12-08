import Path from 'path'
import Test from 'ava'
import URL from 'url'

import { Check } from '../../index.js'

const FilePath = URL.fileURLToPath(import.meta.url)
const FolderPath = Path.dirname(FilePath)

const ResourcePath = Path.normalize(`${FolderPath}/resource/pug`)

// missing

Test('Check(\'missing/filter\', {})', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/missing/filter`, {}), { 
    'missing': { 
      'markdown-it': [ `${ResourcePath}/missing/filter/template.pug` ] 
    },
    'unused': [],
    'used': { 
      'markdown-it': [ `${ResourcePath}/missing/filter/template.pug` ] 
    }
  })
})

Test('Check(\'missing/filter-and-filter-include\', {})', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/missing/filter-and-filter-include`, {}), { 
    'missing': { 
      'coffee-script': [ `${ResourcePath}/missing/filter-and-filter-include/template.pug` ],
      'markdown-it': [ `${ResourcePath}/missing/filter-and-filter-include/template.pug` ] 
    }, 
    'unused': [],
    'used': { 
      'coffee-script': [ `${ResourcePath}/missing/filter-and-filter-include/template.pug` ],
      'markdown-it': [ `${ResourcePath}/missing/filter-and-filter-include/template.pug` ] 
    }
  })
})

Test('Check(\'missing/filter-include\', {})', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/missing/filter-include`, {}), { 
    'missing': { 
      'markdown-it': [ `${ResourcePath}/missing/filter-include/template.pug` ] 
    },
    'unused': [],
    'used': { 
      'markdown-it': [ `${ResourcePath}/missing/filter-include/template.pug` ] 
    }
  })
})

Test('Check(\'missing/no-filter\', {})', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/missing/no-filter`, {}), { 
    'missing': {}, 
    'unused': [],
    'used': {}
  })
})

// unused

Test('Check(\'unused/no-filter\', {})', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/unused/no-filter`, {}), { 
    'missing': {},
    'unused': [
      'jstransformer-markdown-it'
    ],
    'used': {}
  })
})

// used/rename-dependency

Test('Check(\'used/rename-dependency/filter\', {})', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/used/rename-dependency/filter`, {}), { 
    'missing': {},
    'unused': [],
    'used': { 
      'jstransformer-markdown-it': [ `${ResourcePath}/used/rename-dependency/filter/template.pug` ] 
    }
  })
})

Test('Check(\'used/rename-dependency/filter-and-filter-include\', {})', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/used/rename-dependency/filter-and-filter-include`, {}), { 
    'missing': {}, 
    'unused': [],
    'used': { 
      'jstransformer-coffee-script': [ `${ResourcePath}/used/rename-dependency/filter-and-filter-include/template.pug` ],
      'jstransformer-markdown-it': [ `${ResourcePath}/used/rename-dependency/filter-and-filter-include/template.pug` ] 
    }
  })
})

Test('Check(\'used/rename-dependency/filter-include\', {})', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/used/rename-dependency/filter-include`, {}), { 
    'missing': {}, 
    'unused': [],
    'used': { 
      'jstransformer-markdown-it': [ `${ResourcePath}/used/rename-dependency/filter-include/template.pug` ] 
    }
  })
})

// used/same-name-dependency

Test('Check(\'used/same-name-dependency/filter\', {})', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/used/same-name-dependency/filter`, {}), { 
    'missing': {},
    'unused': [],
    'used': { 
      'markdown-it': [ `${ResourcePath}/used/same-name-dependency/filter/template.pug` ] 
    }
  })
})

Test('Check(\'used/same-name-dependency/filter-and-filter-include\', {})', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/used/same-name-dependency/filter-and-filter-include`, {}), { 
    'missing': {}, 
    'unused': [],
    'used': { 
      'coffee-script': [ `${ResourcePath}/used/same-name-dependency/filter-and-filter-include/template.pug` ],
      'markdown-it': [ `${ResourcePath}/used/same-name-dependency/filter-and-filter-include/template.pug` ] 
    }
  })
})

Test('Check(\'used/same-name-dependency/filter-include\', {})', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/used/same-name-dependency/filter-include`, {}), { 
    'missing': {}, 
    'unused': [],
    'used': { 
      'markdown-it': [ `${ResourcePath}/used/same-name-dependency/filter-include/template.pug` ] 
    }
  })
})
