import Path from 'path';
import Test from 'ava';
import URL from 'url';

import { Check } from '../../index.js';

const FilePath = URL.fileURLToPath(import.meta.url);
const FolderPath = Path.dirname(FilePath);
const Process = process;

const ResourcePath = Path.normalize(`${FolderPath}/resource/make`);

Test('Check(\'makefile/missing\', {})', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/makefile/missing`, {}), {
    'missing': {},
    'unused': [],
    'used': {} });

});

Test('Check(\'makefile/unused\', {})', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/makefile/unused`, {}), {
    'missing': {},
    'unused': [
    'shx'],

    'used': {} });

});

Test('Check(\'makefile/used/default\', {})', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/makefile/used/default`, {}), {
    'missing': {},
    'unused': [],
    'used': {
      'abc': [`${ResourcePath}/makefile/used/default/makefile`],
      'bcd': [`${ResourcePath}/makefile/used/default/makefile`],
      'cde': [`${ResourcePath}/makefile/used/default/makefile`],
      'def': [`${ResourcePath}/makefile/used/default/makefile`],
      'efg': [`${ResourcePath}/makefile/used/default/makefile`],
      'fgh': [`${ResourcePath}/makefile/used/default/makefile`],
      'ghi': [`${ResourcePath}/makefile/used/default/makefile`],
      'hij': [`${ResourcePath}/makefile/used/default/makefile`] } });


});

Test('Check(\'makefile/used/space-before\', {})', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/makefile/used/space-before`, {}), {
    'missing': {},
    'unused': [],
    'used': {
      'shx': [`${ResourcePath}/makefile/used/space-before/makefile`] } });


});

Test('Check(\'makefile/used/space-after\', {})', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/makefile/used/space-after`, {}), {
    'missing': {},
    'unused': [],
    'used': {
      'shx': [`${ResourcePath}/makefile/used/space-after/makefile`] } });


});

Test('Check(\'makefile/used/multiple\', {})', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/makefile/used/multiple`, {}), {
    'missing': {},
    'unused': [],
    'used': {
      'pwd': [`${ResourcePath}/makefile/used/multiple/makefile`],
      'shx': [`${ResourcePath}/makefile/used/multiple/makefile`] } });


});

Test('Check(\'makefile/used/rule\', {})', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/makefile/used/rule`, {}), {
    'missing': {},
    'unused': [],
    'used': {
      'shx': [`${ResourcePath}/makefile/used/rule/makefile`] } });


});

Test('Check(\'makefile/used/include\', {})', async (test) => {
  Process.env['MAKEFILE_LIST'] = 'makefile ./include';
  test.deepEqual(await Check(`${ResourcePath}/makefile/used/include`, {}), {
    'missing': {},
    'unused': [],
    'used': {
      'shx': [`${ResourcePath}/makefile/used/include/include`] } });


});

//# sourceMappingURL=check-make.test.js.map