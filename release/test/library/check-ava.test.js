import Path from 'path';
import Test from 'ava';
import URL from 'url';

import { Check } from '../../index.js';

const FilePath = URL.fileURLToPath(import.meta.url);
const FolderPath = Path.dirname(FilePath);

const ResourcePath = Path.normalize(`${FolderPath}/resource/ava`);

// ava.config.json

Test('Check(\'ava-config/used\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/ava-config/used`), {
    'missing': {},
    'unused': [],
    'used': {
      '@virtualpatterns/mablung-source-map-support': [`${ResourcePath}/ava-config/used/ava.config.json`] } });


});

// package.json

Test('Check(\'package/missing\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/package/missing`), {
    'missing': {
      '@virtualpatterns/mablung-source-map-support': [`${ResourcePath}/package/missing/package.json`] },

    'unused': [],
    'used': {
      '@virtualpatterns/mablung-source-map-support': [`${ResourcePath}/package/missing/package.json`] } });


});

Test('Check(\'package/no-ava\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/package/no-ava`), {
    'missing': {},
    'unused': [
    '@virtualpatterns/mablung-source-map-support'],

    'used': {} });

});

Test('Check(\'package/unused\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/package/unused`), {
    'missing': {},
    'unused': [
    '@virtualpatterns/mablung-source-map-support'],

    'used': {} });

});

Test('Check(\'package/used\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/package/used`), {
    'missing': {},
    'unused': [],
    'used': {
      '@virtualpatterns/mablung-source-map-support': [`${ResourcePath}/package/used/package.json`] } });


});
//# sourceMappingURL=check-ava.test.js.map