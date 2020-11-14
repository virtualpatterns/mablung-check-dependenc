import Path from 'path'
import Test from 'ava'
import URL from 'url'

import { Check } from '../../index.js'
import test from 'ava'

const FilePath = URL.fileURLToPath(import.meta.url)
const FolderPath = Path.dirname(FilePath)

// the resources in source are used because 
// babel doesn't copy dot files (e.g. .babelrc.json)
const ResourcePath = Path.normalize(`${FolderPath}/../../../source/test/library/resource`)

Test('Check(\'used/ava\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/used/ava`), { 
    'missing': {}, 
    'unused': [],
    'used': { 
      '@virtualpatterns/mablung-ava': [ Path.join(ResourcePath, 'used', 'ava', 'package.json') ] 
    }
  })
})

Test('Check(\'used/ava.config.json\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/used/ava.config.json`), { 
    'missing': {}, 
    'unused': [],
    'used': { 
      '@virtualpatterns/mablung-ava': [ Path.join(ResourcePath, 'used', 'ava.config.json', 'ava.config.json') ] 
    }
  })
})

Test('Check(\'used/babel-environment-plugin\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/used/babel-environment-plugin`), { 
    'missing': {}, 
    'unused': [],
    'used': { 
      '@virtualpatterns/mablung-babel-environment-plugin': [ Path.join(ResourcePath, 'used', 'babel-environment-plugin', 'package.json') ] 
    }
  })
})

Test('Check(\'used/babel-environment-preset\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/used/babel-environment-preset`), { 
    'missing': {}, 
    'unused': [],
    'used': { 
      '@virtualpatterns/mablung-babel-environment-preset': [ Path.join(ResourcePath, 'used', 'babel-environment-preset', 'package.json') ] 
    }
  })
})


Test('Check(\'used/babel-plugin\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/used/babel-plugin`), { 
    'missing': {}, 
    'unused': [],
    'used': { 
      '@virtualpatterns/mablung-babel-plugin': [ Path.join(ResourcePath, 'used', 'babel-plugin', 'package.json') ] 
    }
  })
})

Test('Check(\'used/babel-preset\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/used/babel-preset`), { 
    'missing': {}, 
    'unused': [],
    'used': { 
      '@virtualpatterns/mablung-babel-preset': [ Path.join(ResourcePath, 'used', 'babel-preset', 'package.json') ] 
    }
  })
})

Test('Check(\'used/babel.config.json-environment-plugin\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/used/babel.config.json-environment-plugin`), { 
    'missing': {}, 
    'unused': [],
    'used': { 
      '@virtualpatterns/mablung-babel-environment-plugin': [ Path.join(ResourcePath, 'used', 'babel.config.json-environment-plugin', 'babel.config.json') ] 
    }
  })
})

Test('Check(\'used/babel.config.json-environment-preset\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/used/babel.config.json-environment-preset`), { 
    'missing': {}, 
    'unused': [],
    'used': { 
      '@virtualpatterns/mablung-babel-environment-preset': [ Path.join(ResourcePath, 'used', 'babel.config.json-environment-preset', 'babel.config.json') ] 
    }
  })
})

Test('Check(\'used/babel.config.json-plugin\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/used/babel.config.json-plugin`), { 
    'missing': {}, 
    'unused': [],
    'used': { 
      '@virtualpatterns/mablung-babel-plugin': [ Path.join(ResourcePath, 'used', 'babel.config.json-plugin', 'babel.config.json') ] 
    }
  })
})

Test('Check(\'used/babel.config.json-preset\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/used/babel.config.json-preset`), { 
    'missing': {}, 
    'unused': [],
    'used': { 
      '@virtualpatterns/mablung-babel-preset': [ Path.join(ResourcePath, 'used', 'babel.config.json-preset', 'babel.config.json') ] 
    }
  })
})

Test('Check(\'used/babelrc.json-environment-plugin\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/used/babelrc.json-environment-plugin`), { 
    'missing': {}, 
    'unused': [], 
    'used': { 
      '@virtualpatterns/mablung-babel-environment-plugin': [ Path.join(ResourcePath, 'used', 'babelrc.json-environment-plugin', '.babelrc.json') ] 
    }
  })
})

Test('Check(\'used/babelrc.json-environment-preset\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/used/babelrc.json-environment-preset`), { 
    'missing': {}, 
    'unused': [],
    'used': { 
      '@virtualpatterns/mablung-babel-environment-preset': [ Path.join(ResourcePath, 'used', 'babelrc.json-environment-preset', '.babelrc.json') ] 
    }
  })
})

Test('Check(\'used/babelrc.json-plugin\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/used/babelrc.json-plugin`), { 
    'missing': {}, 
    'unused': [],
    'used': { 
      '@virtualpatterns/mablung-babel-plugin': [ Path.join(ResourcePath, 'used', 'babelrc.json-plugin', '.babelrc.json') ] 
    }
  })
})

Test('Check(\'used/babelrc.json-preset\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/used/babelrc.json-preset`), {
    'missing': {}, 
    'unused': [],
    'used': { 
      '@virtualpatterns/mablung-babel-preset': [ Path.join(ResourcePath, 'used', 'babelrc.json-preset', '.babelrc.json') ] 
    }
  })
})

Test('Check(\'used/browser\')', async (test) => {
  // the packages 'buffer', 'events', 'util' (maybe more)
  // are ignored by depcheck even if returned by the browser.js parser
  test.deepEqual(await Check(`${ResourcePath}/used/browser`), { 
    'missing': {},
    'unused': [
      'buffer',
      'events',
      'util'
    ],
    'used': { 
      'stream-browserify': [ `${ResourcePath}/used/browser/package.json` ] 
    }
  })
})

Test('Check(\'used/dependency\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/used/dependency`), { 
    'missing': {}, 
    'unused': [],
    'used': { 
      '@virtualpatterns/mablung-dependency': [ Path.join(ResourcePath, 'used', 'dependency/dependency.js') ] 
    } 
  })
})

Test('Check(\'used/parcel\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/used/parcel`), { 
    'missing': {}, 
    'unused': [
      'parcel-bundler'
    ],
    'used': { 
      '@studysync/parcel-plugin-bundle-visualiser': [ Path.join(ResourcePath, 'used', 'parcel', 'package.json') ],
      'parcel-plugin-asset-copier': [ Path.join(ResourcePath, 'used', 'parcel', 'package.json') ] 
    }
  })
})

Test('Check(\'used/pug-filter\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/used/pug-filter`), { 
    'missing': {}, 
    'unused': [],
    'used': { 
      'jstransformer-markdown-it': [ `${ResourcePath}/used/pug-filter/template.pug` ] 
    }
  })
})

Test('Check(\'used/pug-filter-include\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/used/pug-filter-include`), { 
    'missing': {}, 
    'unused': [],
    'used': { 
      'jstransformer-markdown-it': [ `${ResourcePath}/used/pug-filter-include/template.pug` ] 
    }
  })
})

Test('Check(\'used/pug-filter-and-filter-include\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/used/pug-filter-and-filter-include`), { 
    'missing': {}, 
    'unused': [],
    'used': { 
      'jstransformer-coffee-script': [ `${ResourcePath}/used/pug-filter-and-filter-include/template.pug` ],
      'jstransformer-markdown-it': [ `${ResourcePath}/used/pug-filter-and-filter-include/template.pug` ] 
    }
  })
})
