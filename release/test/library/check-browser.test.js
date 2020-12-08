import Path from 'path';
import Test from 'ava';
import URL from 'url';

import { Check } from '../../index.js';

const FilePath = URL.fileURLToPath(import.meta.url);
const FolderPath = Path.dirname(FilePath);

const ResourcePath = Path.normalize(`${FolderPath}/resource/browser`);

Test('Check(\'missing\', {})', async test => {
  test.deepEqual(await Check(`${ResourcePath}/missing`, {}), {
    'missing': {
      'stream-browserify': [`${ResourcePath}/missing/package.json`] },

    'unused': [],
    'used': {
      'stream-browserify': [`${ResourcePath}/missing/package.json`] } });


});

Test('Check(\'no-browser\', {})', async test => {
  test.deepEqual(await Check(`${ResourcePath}/no-browser`, {}), {
    'missing': {},
    'unused': [
    // the packages buffer, events, util (maybe more)
    // are ignored by depcheck even if returned by the browser.js parser
    'stream-browserify',
    'util'],

    'used': {} });

});

Test('Check(\'unused\', {})', async test => {
  test.deepEqual(await Check(`${ResourcePath}/unused`, {}), {
    'missing': {},
    'unused': [
    // the packages buffer, events, util (maybe more)
    // are ignored by depcheck even if returned by the browser.js parser
    'stream-browserify',
    'util'],

    'used': {} });

});

Test('Check(\'used\', {})', async test => {
  test.deepEqual(await Check(`${ResourcePath}/used`, {}), {
    'missing': {},
    'unused': [
    // the packages buffer, events, util (maybe more)
    // are ignored by depcheck even if returned by the browser.js parser
    'util'],

    'used': {
      'stream-browserify': [`${ResourcePath}/used/package.json`] } });


});
//# sourceMappingURL=check-browser.test.js.map