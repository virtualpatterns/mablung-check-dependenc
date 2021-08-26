import Path from 'path'
import Test from 'ava'
import URL from 'url'

import { Check } from '../../index.js'

const FilePath = URL.fileURLToPath(import.meta.url)
const FolderPath = Path.dirname(FilePath)

const ResourcePath = Path.normalize(`${FolderPath}/resource/babel`)

// babel.config.json

Test('Check(\'babel-config-json/missing\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/babel-config-json/missing`), {
    'missing': {
      'plugin-dependency-0': [`${ResourcePath}/babel-config-json/missing/babel.config.json`],
      'plugin-dependency-1': [`${ResourcePath}/babel-config-json/missing/babel.config.json`],
      'preset-dependency-0': [`${ResourcePath}/babel-config-json/missing/babel.config.json`],
      'preset-dependency-1': [`${ResourcePath}/babel-config-json/missing/babel.config.json`]
    },
    'unused': [],
    'used': {
      'plugin-dependency-0': [`${ResourcePath}/babel-config-json/missing/babel.config.json`],
      'plugin-dependency-1': [`${ResourcePath}/babel-config-json/missing/babel.config.json`],
      'preset-dependency-0': [`${ResourcePath}/babel-config-json/missing/babel.config.json`],
      'preset-dependency-1': [`${ResourcePath}/babel-config-json/missing/babel.config.json`]
    }
  })
})

Test('Check(\'babel-config-json/unused\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/babel-config-json/unused`), {
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
  test.deepEqual(await Check(`${ResourcePath}/babel-config-json/used`), {
    'missing': {},
    'unused': [],
    'used': {
      'plugin-dependency-0': [`${ResourcePath}/babel-config-json/used/babel.config.json`],
      'plugin-dependency-1': [`${ResourcePath}/babel-config-json/used/babel.config.json`],
      'preset-dependency-0': [`${ResourcePath}/babel-config-json/used/babel.config.json`],
      'preset-dependency-1': [`${ResourcePath}/babel-config-json/used/babel.config.json`]
    }
  })
})

// .babelrc.json

Test('Check(\'babelrc-json/missing\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/babelrc-json/missing`), {
    'missing': {
      'plugin-dependency-0': [`${ResourcePath}/babelrc-json/missing/.babelrc.json`],
      'plugin-dependency-1': [`${ResourcePath}/babelrc-json/missing/.babelrc.json`],
      'preset-dependency-0': [`${ResourcePath}/babelrc-json/missing/.babelrc.json`],
      'preset-dependency-1': [`${ResourcePath}/babelrc-json/missing/.babelrc.json`]
    },
    'unused': [],
    'used': {
      'plugin-dependency-0': [`${ResourcePath}/babelrc-json/missing/.babelrc.json`],
      'plugin-dependency-1': [`${ResourcePath}/babelrc-json/missing/.babelrc.json`],
      'preset-dependency-0': [`${ResourcePath}/babelrc-json/missing/.babelrc.json`],
      'preset-dependency-1': [`${ResourcePath}/babelrc-json/missing/.babelrc.json`]
    }
  })
})

Test('Check(\'babelrc-json/unused\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/babelrc-json/unused`), {
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
  test.deepEqual(await Check(`${ResourcePath}/babelrc-json/used`), {
    'missing': {},
    'unused': [],
    'used': {
      'plugin-dependency-0': [`${ResourcePath}/babelrc-json/used/.babelrc.json`],
      'plugin-dependency-1': [`${ResourcePath}/babelrc-json/used/.babelrc.json`],
      'preset-dependency-0': [`${ResourcePath}/babelrc-json/used/.babelrc.json`],
      'preset-dependency-1': [`${ResourcePath}/babelrc-json/used/.babelrc.json`]
    }
  })
})
