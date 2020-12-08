import Path from 'path';
import Test from 'ava';
import URL from 'url';

import { Check } from '../../index.js';

const FilePath = URL.fileURLToPath(import.meta.url);
const FolderPath = Path.dirname(FilePath);

const ResourcePath = Path.normalize(`${FolderPath}/resource/parcel`);

Test('Check(\'bundler-no-plugin\', {})', async test => {
  test.deepEqual(await Check(`${ResourcePath}/bundler-no-plugin`, {}), {
    'missing': {},
    'unused': [
    'parcel-bundler'],

    'used': {} });

});

Test('Check(\'bundler-plugin\', {})', async test => {
  test.deepEqual(await Check(`${ResourcePath}/bundler-plugin`, {}), {
    'missing': {},
    'unused': [
    'parcel-bundler'],

    'used': {
      '@virtualpatterns/parcel-plugin-virtual-pug': [`${ResourcePath}/bundler-plugin/package.json`] } });


});

Test('Check(\'no-bundler\', {})', async test => {
  test.deepEqual(await Check(`${ResourcePath}/no-bundler`, {}), {
    'missing': {},
    'unused': [],
    'used': {} });

});

Test('Check(\'no-bundler-plugin\', {})', async test => {
  test.deepEqual(await Check(`${ResourcePath}/no-bundler-plugin`, {}), {
    'missing': {},
    'unused': [
    '@virtualpatterns/parcel-plugin-virtual-pug'],

    'used': {} });

});

Test('Check(\'no-dependency\', {})', async test => {
  test.deepEqual(await Check(`${ResourcePath}/no-dependency`, {}), {
    'missing': {},
    'unused': [],
    'used': {} });

});
//# sourceMappingURL=check-parcel.test.js.map