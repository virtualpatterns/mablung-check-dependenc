import Path from 'path'
import Test from 'ava'
import URL from 'url'

import { Check } from '../../index.js'

const FilePath = URL.fileURLToPath(import.meta.url)
const FolderPath = Path.dirname(FilePath)

// the resources in source are used because 
// babel doesn't copy dot files (e.g. .babelrc.json)
const ResourcePath = Path.normalize(`${FolderPath}/../../../source/test/library/resource`)

Test('Check(\'unused/dependency\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/unused/dependency`), { 'missing': {}, 'unused': [ '@virtualpatterns/mablung-dependency' ] })
})

Test('Check(\'unused/development-dependency\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/unused/development-dependency`), { 'missing': {}, 'unused': [ '@virtualpatterns/mablung-development-dependency' ] })
})

Test('Check(\'missing/dependency\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/missing/dependency`), { 'missing': { '@virtualpatterns/mablung-dependency': [ `${ResourcePath}/missing/dependency/dependency.js` ] }, 'unused': [] })
})

Test('Check(\'missing/ava\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/missing/ava`), { 'missing': { '@virtualpatterns/mablung-ava': [ `${ResourcePath}/missing/ava/package.json` ] }, 'unused': [] })
})

Test('Check(\'missing/ava.config.json\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/missing/ava.config.json`), { 'missing': { '@virtualpatterns/mablung-ava': [ `${ResourcePath}/missing/ava.config.json/ava.config.json` ] }, 'unused': [] })
})

Test('Check(\'missing/babel-plugin\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/missing/babel-plugin`), { 'missing': { '@virtualpatterns/mablung-babel-plugin': [ `${ResourcePath}/missing/babel-plugin/package.json` ] }, 'unused': [] })
})

Test('Check(\'missing/babel-preset\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/missing/babel-preset`), { 'missing': { '@virtualpatterns/mablung-babel-preset': [ `${ResourcePath}/missing/babel-preset/package.json` ] }, 'unused': [] })
})

Test('Check(\'missing/babel-environment-plugin\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/missing/babel-environment-plugin`), { 'missing': { '@virtualpatterns/mablung-babel-environment-plugin': [ `${ResourcePath}/missing/babel-environment-plugin/package.json` ] }, 'unused': [] })
})

Test('Check(\'missing/babel-environment-preset\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/missing/babel-environment-preset`), { 'missing': { '@virtualpatterns/mablung-babel-environment-preset': [ `${ResourcePath}/missing/babel-environment-preset/package.json` ] }, 'unused': [] })
})

Test('Check(\'missing/babel.config.json-plugin\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/missing/babel.config.json-plugin`), { 'missing': { '@virtualpatterns/mablung-babel-plugin': [ `${ResourcePath}/missing/babel.config.json-plugin/babel.config.json` ] }, 'unused': [] })
})

Test('Check(\'missing/babel.config.json-preset\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/missing/babel.config.json-preset`), { 'missing': { '@virtualpatterns/mablung-babel-preset': [ `${ResourcePath}/missing/babel.config.json-preset/babel.config.json` ] }, 'unused': [] })
})

Test('Check(\'missing/babel.config.json-environment-plugin\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/missing/babel.config.json-environment-plugin`), { 'missing': { '@virtualpatterns/mablung-babel-environment-plugin': [ `${ResourcePath}/missing/babel.config.json-environment-plugin/babel.config.json` ] }, 'unused': [] })
})

Test('Check(\'missing/babel.config.json-environment-preset\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/missing/babel.config.json-environment-preset`), { 'missing': { '@virtualpatterns/mablung-babel-environment-preset': [ `${ResourcePath}/missing/babel.config.json-environment-preset/babel.config.json` ] }, 'unused': [] })
})

Test('Check(\'missing/babelrc.json-plugin\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/missing/babelrc.json-plugin`), { 'missing': { '@virtualpatterns/mablung-babel-plugin': [ `${ResourcePath}/missing/babelrc.json-plugin/.babelrc.json` ] }, 'unused': [] })
})

Test('Check(\'missing/babelrc.json-preset\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/missing/babelrc.json-preset`), { 'missing': { '@virtualpatterns/mablung-babel-preset': [ `${ResourcePath}/missing/babelrc.json-preset/.babelrc.json` ] }, 'unused': [] })
})

Test('Check(\'missing/babelrc.json-environment-plugin\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/missing/babelrc.json-environment-plugin`), { 'missing': { '@virtualpatterns/mablung-babel-environment-plugin': [ `${ResourcePath}/missing/babelrc.json-environment-plugin/.babelrc.json` ] }, 'unused': [] })
})

Test('Check(\'missing/babelrc.json-environment-preset\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/missing/babelrc.json-environment-preset`), { 'missing': { '@virtualpatterns/mablung-babel-environment-preset': [ `${ResourcePath}/missing/babelrc.json-environment-preset/.babelrc.json` ] }, 'unused': [] })
})

Test('Check(\'ignore-match\', { ignoreMatch: [ ... ] })', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/ignore-match`, { 'ignoreMatch': [ '@virtualpatterns/mablung-dependency' ] }), { 'missing': {}, 'unused': [] })
})

Test('Check(\'ignore-pattern\', { ignorePattern: [ ... ] })', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/ignore-pattern`, { 'ignorePattern': [ 'ignore-pattern.js' ] }), { 'missing': {}, 'unused': [ '@virtualpatterns/mablung-dependency' ] })
})

Test('Check(\'error/babelrc.json\') throws SyntaxError', async (test) => {
  await test.throwsAsync(Check(`${ResourcePath}/error/babelrc.json`), { 'instanceOf': SyntaxError })
})
