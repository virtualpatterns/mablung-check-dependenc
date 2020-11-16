import { createRequire as CreateRequire } from 'module'
import Path from 'path'
import Test from 'ava'
import URL from 'url'

import { Babel } from '../../../library/special/babel.js'

const FilePath = URL.fileURLToPath(import.meta.url)
const FolderPath = Path.dirname(FilePath)

const Require = CreateRequire(import.meta.url)

// the resources in source are used because 
// babel doesn't copy dot files (e.g. .babelrc.json)
const ResourcePath = Path.normalize(`${FolderPath}/../../../../source/test/library/special/resource/babel/plugins-and-presets`)

Test('Babel(\'.babelrc.json\', [])', async (test) => {
  test.deepEqual(
    await Babel(Require.resolve(`${ResourcePath}/.babelrc.json`), []),
    [
      'proposal-export-default-from',
      'replace-identifier',
      'export-default-from',
      'env'
    ])
})

Test('Babel(\'.babelrc.json\', []) with rename', async (test) => {
  test.deepEqual(
    await Babel(Require.resolve(`${ResourcePath}/.babelrc.json`), [
      '@babel/plugin-proposal-export-default-from',
      '@virtualpatterns/mablung-babel-plugin-replace-identifier',
      '@babel/preset-export-default-from',
      '@babel/preset-env'
    ]),
    [
      '@babel/plugin-proposal-export-default-from',
      '@virtualpatterns/mablung-babel-plugin-replace-identifier',
      '@babel/preset-export-default-from',
      '@babel/preset-env'
    ])
})

Test('Babel(\'babel.config.json\', [])', async (test) => {
  test.deepEqual(
    await Babel(Require.resolve(`${ResourcePath}/babel.config.json`), []),
    [
      'proposal-export-default-from',
      'replace-identifier',
      'export-default-from',
      'env'
    ])
})

Test('Babel(\'babel.config.json\', []) with rename', async (test) => {
  test.deepEqual(
    await Babel(Require.resolve(`${ResourcePath}/babel.config.json`), [
      '@babel/plugin-proposal-export-default-from',
      '@virtualpatterns/mablung-babel-plugin-replace-identifier',
      '@babel/preset-export-default-from',
      '@babel/preset-env'
    ]),
    [
      '@babel/plugin-proposal-export-default-from',
      '@virtualpatterns/mablung-babel-plugin-replace-identifier',
      '@babel/preset-export-default-from',
      '@babel/preset-env'
    ])
})

Test('Babel(\'package.json\', [])', async (test) => {
  test.deepEqual(
    await Babel(Require.resolve(`${ResourcePath}/package.json`), []),
    [
      'proposal-export-default-from',
      'replace-identifier',
      'export-default-from',
      'env'
    ])
})

Test('Babel(\'package.json\', []) with rename', async (test) => {
  test.deepEqual(
    await Babel(Require.resolve(`${ResourcePath}/package.json`), [
      '@babel/plugin-proposal-export-default-from',
      '@virtualpatterns/mablung-babel-plugin-replace-identifier',
      '@babel/preset-export-default-from',
      '@babel/preset-env'
    ]),
    [
      '@babel/plugin-proposal-export-default-from',
      '@virtualpatterns/mablung-babel-plugin-replace-identifier',
      '@babel/preset-export-default-from',
      '@babel/preset-env'
    ])
})
