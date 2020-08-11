import Path from 'path';
import Test from 'ava';
import URL from 'url';

import { Check } from '../../index.js';

const FilePath = URL.fileURLToPath(import.meta.url);
const FolderPath = Path.dirname(FilePath);

// the resources in source are used because 
// babel doesn't copy dot files (e.g. .babelrc.json)
const ResourcePath = Path.normalize(`${FolderPath}/../../../source/test/library/resource`);

Test('Check(\'missing/ava\')', async test => {
  test.deepEqual(await Check(`${ResourcePath}/missing/ava`), {
    'missing': {
      '@virtualpatterns/mablung-ava': [`${ResourcePath}/missing/ava/package.json`] },

    'unused': [],
    'used': {
      '@virtualpatterns/mablung-ava': [`${ResourcePath}/missing/ava/package.json`] } });


});

Test('Check(\'missing/ava.config.json\')', async test => {
  test.deepEqual(await Check(`${ResourcePath}/missing/ava.config.json`), {
    'missing': {
      '@virtualpatterns/mablung-ava': [`${ResourcePath}/missing/ava.config.json/ava.config.json`] },

    'unused': [],
    'used': {
      '@virtualpatterns/mablung-ava': [`${ResourcePath}/missing/ava.config.json/ava.config.json`] } });


});

Test('Check(\'missing/babel-environment-plugin\')', async test => {
  test.deepEqual(await Check(`${ResourcePath}/missing/babel-environment-plugin`), {
    'missing': {
      'babel-environment-plugin': [`${ResourcePath}/missing/babel-environment-plugin/package.json`] },

    'unused': [],
    'used': {
      'babel-environment-plugin': [`${ResourcePath}/missing/babel-environment-plugin/package.json`] } });


});

Test('Check(\'missing/babel-environment-preset\')', async test => {
  test.deepEqual(await Check(`${ResourcePath}/missing/babel-environment-preset`), {
    'missing': {
      'babel-environment-preset': [`${ResourcePath}/missing/babel-environment-preset/package.json`] },

    'unused': [],
    'used': {
      'babel-environment-preset': [`${ResourcePath}/missing/babel-environment-preset/package.json`] } });


});

Test('Check(\'missing/babel-plugin\')', async test => {
  test.deepEqual(await Check(`${ResourcePath}/missing/babel-plugin`), {
    'missing': {
      'babel-plugin': [`${ResourcePath}/missing/babel-plugin/package.json`] },

    'unused': [],
    'used': {
      'babel-plugin': [`${ResourcePath}/missing/babel-plugin/package.json`] } });


});

Test('Check(\'missing/babel-preset\')', async test => {
  test.deepEqual(await Check(`${ResourcePath}/missing/babel-preset`), {
    'missing': {
      'babel-preset': [`${ResourcePath}/missing/babel-preset/package.json`] },

    'unused': [],
    'used': {
      'babel-preset': [`${ResourcePath}/missing/babel-preset/package.json`] } });


});

Test('Check(\'missing/babel.config.json-environment-plugin\')', async test => {
  test.deepEqual(await Check(`${ResourcePath}/missing/babel.config.json-environment-plugin`), {
    'missing': {
      'babel-environment-plugin': [`${ResourcePath}/missing/babel.config.json-environment-plugin/babel.config.json`] },

    'unused': [],
    'used': {
      'babel-environment-plugin': [`${ResourcePath}/missing/babel.config.json-environment-plugin/babel.config.json`] } });


});

Test('Check(\'missing/babel.config.json-environment-preset\')', async test => {
  test.deepEqual(await Check(`${ResourcePath}/missing/babel.config.json-environment-preset`), {
    'missing': {
      'babel-environment-preset': [`${ResourcePath}/missing/babel.config.json-environment-preset/babel.config.json`] },

    'unused': [],
    'used': {
      'babel-environment-preset': [`${ResourcePath}/missing/babel.config.json-environment-preset/babel.config.json`] } });


});

Test('Check(\'missing/babel.config.json-plugin\')', async test => {
  test.deepEqual(await Check(`${ResourcePath}/missing/babel.config.json-plugin`), {
    'missing': {
      'babel-plugin': [`${ResourcePath}/missing/babel.config.json-plugin/babel.config.json`] },

    'unused': [],
    'used': {
      'babel-plugin': [`${ResourcePath}/missing/babel.config.json-plugin/babel.config.json`] } });


});

Test('Check(\'missing/babel.config.json-preset\')', async test => {
  test.deepEqual(await Check(`${ResourcePath}/missing/babel.config.json-preset`), {
    'missing': {
      'babel-preset': [`${ResourcePath}/missing/babel.config.json-preset/babel.config.json`] },

    'unused': [],
    'used': {
      'babel-preset': [`${ResourcePath}/missing/babel.config.json-preset/babel.config.json`] } });


});

Test('Check(\'missing/babelrc.json-environment-plugin\')', async test => {
  test.deepEqual(await Check(`${ResourcePath}/missing/babelrc.json-environment-plugin`), {
    'missing': {
      'babel-environment-plugin': [`${ResourcePath}/missing/babelrc.json-environment-plugin/.babelrc.json`] },

    'unused': [],
    'used': {
      'babel-environment-plugin': [`${ResourcePath}/missing/babelrc.json-environment-plugin/.babelrc.json`] } });


});

Test('Check(\'missing/babelrc.json-environment-preset\')', async test => {
  test.deepEqual(await Check(`${ResourcePath}/missing/babelrc.json-environment-preset`), {
    'missing': {
      'babel-environment-preset': [`${ResourcePath}/missing/babelrc.json-environment-preset/.babelrc.json`] },

    'unused': [],
    'used': {
      'babel-environment-preset': [`${ResourcePath}/missing/babelrc.json-environment-preset/.babelrc.json`] } });


});

Test('Check(\'missing/babelrc.json-plugin\')', async test => {
  test.deepEqual(await Check(`${ResourcePath}/missing/babelrc.json-plugin`), {
    'missing': {
      'babel-plugin': [`${ResourcePath}/missing/babelrc.json-plugin/.babelrc.json`] },

    'unused': [],
    'used': {
      'babel-plugin': [`${ResourcePath}/missing/babelrc.json-plugin/.babelrc.json`] } });


});

Test('Check(\'missing/babelrc.json-preset\')', async test => {
  test.deepEqual(await Check(`${ResourcePath}/missing/babelrc.json-preset`), {
    'missing': {
      'babel-preset': [`${ResourcePath}/missing/babelrc.json-preset/.babelrc.json`] },

    'unused': [],
    'used': {
      'babel-preset': [`${ResourcePath}/missing/babelrc.json-preset/.babelrc.json`] } });


});

Test('Check(\'missing/dependency\')', async test => {
  test.deepEqual(await Check(`${ResourcePath}/missing/dependency`), {
    'missing': {
      '@virtualpatterns/mablung-dependency': [`${ResourcePath}/missing/dependency/dependency.js`] },

    'unused': [],
    'used': {
      '@virtualpatterns/mablung-dependency': [`${ResourcePath}/missing/dependency/dependency.js`] } });


});

Test('Check(\'missing/pug\')', async test => {
  test.deepEqual(await Check(`${ResourcePath}/missing/pug`), {
    'missing': {
      'markdown-it': [`${ResourcePath}/missing/pug/template.pug`] },

    'unused': [],
    'used': {
      'markdown-it': [`${ResourcePath}/missing/pug/template.pug`] } });


});
//# sourceMappingURL=check-missing.test.js.map