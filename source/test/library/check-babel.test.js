import { Check } from '@virtualpatterns/mablung-check-dependency'
import Path from 'path'
import Test from 'ava'
import URL from 'url'

const FilePath = URL.fileURLToPath(import.meta.url)
const FolderPath = Path.dirname(FilePath)

const ResourcePath = Path.normalize(Path.resolve(FolderPath, 'resource/babel'))

// babel.config.json

Test('Check(\'babel-config-json/missing\')', async (test) => {
  test.deepEqual(await Check(Path.resolve(ResourcePath, 'babel-config-json/missing')), {
    'missing': {
      'plugin-dependency-0': [ Path.resolve(ResourcePath, 'babel-config-json/missing/babel.config.json') ],
      'plugin-dependency-1': [ Path.resolve(ResourcePath, 'babel-config-json/missing/babel.config.json') ],
      'preset-dependency-0': [ Path.resolve(ResourcePath, 'babel-config-json/missing/babel.config.json') ],
      'preset-dependency-1': [ Path.resolve(ResourcePath, 'babel-config-json/missing/babel.config.json') ]
    },
    'unused': [],
    'used': {
      'plugin-dependency-0': [ Path.resolve(ResourcePath, 'babel-config-json/missing/babel.config.json') ],
      'plugin-dependency-1': [ Path.resolve(ResourcePath, 'babel-config-json/missing/babel.config.json') ],
      'preset-dependency-0': [ Path.resolve(ResourcePath, 'babel-config-json/missing/babel.config.json') ],
      'preset-dependency-1': [ Path.resolve(ResourcePath, 'babel-config-json/missing/babel.config.json') ]
    }
  })
})

Test('Check(\'babel-config-json/unused\')', async (test) => {
  test.deepEqual(await Check(Path.resolve(ResourcePath, 'babel-config-json/unused')), {
    'missing': {},
    'unused': [
      'plugin-dependency-0',
      'plugin-dependency-1',
      'preset-dependency-0',
      'preset-dependency-1'
    ],
    'used': {}
  })
})

Test('Check(\'babel-config-json/used\')', async (test) => {
  test.deepEqual(await Check(Path.resolve(ResourcePath, 'babel-config-json/used')), {
    'missing': {},
    'unused': [],
    'used': {
      'plugin-dependency-0': [ Path.resolve(ResourcePath, 'babel-config-json/used/babel.config.json') ],
      'plugin-dependency-1': [ Path.resolve(ResourcePath, 'babel-config-json/used/babel.config.json') ],
      'preset-dependency-0': [ Path.resolve(ResourcePath, 'babel-config-json/used/babel.config.json') ],
      'preset-dependency-1': [ Path.resolve(ResourcePath, 'babel-config-json/used/babel.config.json') ]
    }
  })
})

// .babelrc.json

Test('Check(\'babelrc-json/missing\')', async (test) => {
  test.deepEqual(await Check(Path.resolve(ResourcePath, 'babelrc-json/missing')), {
    'missing': {
      'plugin-dependency-0': [ Path.resolve(ResourcePath, 'babelrc-json/missing/.babelrc.json') ],
      'plugin-dependency-1': [ Path.resolve(ResourcePath, 'babelrc-json/missing/.babelrc.json') ],
      'preset-dependency-0': [ Path.resolve(ResourcePath, 'babelrc-json/missing/.babelrc.json') ],
      'preset-dependency-1': [ Path.resolve(ResourcePath, 'babelrc-json/missing/.babelrc.json') ]
    },
    'unused': [],
    'used': {
      'plugin-dependency-0': [ Path.resolve(ResourcePath, 'babelrc-json/missing/.babelrc.json') ],
      'plugin-dependency-1': [ Path.resolve(ResourcePath, 'babelrc-json/missing/.babelrc.json') ],
      'preset-dependency-0': [ Path.resolve(ResourcePath, 'babelrc-json/missing/.babelrc.json') ],
      'preset-dependency-1': [ Path.resolve(ResourcePath, 'babelrc-json/missing/.babelrc.json') ]
    }
  })
})

Test('Check(\'babelrc-json/unused\')', async (test) => {
  test.deepEqual(await Check(Path.resolve(ResourcePath, 'babelrc-json/unused')), {
    'missing': {},
    'unused': [
      'plugin-dependency-0',
      'plugin-dependency-1',
      'preset-dependency-0',
      'preset-dependency-1'
    ],
    'used': {}
  })
})

Test('Check(\'babelrc-json/used\')', async (test) => {
  test.deepEqual(await Check(Path.resolve(ResourcePath, 'babelrc-json/used')), {
    'missing': {},
    'unused': [],
    'used': {
      'plugin-dependency-0': [ Path.resolve(ResourcePath, 'babelrc-json/used/.babelrc.json') ],
      'plugin-dependency-1': [ Path.resolve(ResourcePath, 'babelrc-json/used/.babelrc.json') ],
      'preset-dependency-0': [ Path.resolve(ResourcePath, 'babelrc-json/used/.babelrc.json') ],
      'preset-dependency-1': [ Path.resolve(ResourcePath, 'babelrc-json/used/.babelrc.json') ]
    }
  })
})
