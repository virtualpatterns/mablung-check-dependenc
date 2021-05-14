import Path from 'path';
import Test from 'ava';
import URL from 'url';

import { Check } from '../../index.js';

const FilePath = URL.fileURLToPath(import.meta.url);
const FolderPath = Path.dirname(FilePath);

const ResourcePath = Path.normalize(`${FolderPath}/resource/used`);

Test('Check(\'dependency\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/dependency`), {
    'missing': {},
    'unused': [],
    'used': {
      '@virtualpatterns/mablung-dependency': [`${ResourcePath}/dependency/dependency.js`] } });


});

Test('Check(\'development-dependency\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/development-dependency`), {
    'missing': {},
    'unused': [],
    'used': {
      '@virtualpatterns/mablung-development-dependency': [`${ResourcePath}/development-dependency/dependency.js`] } });


});

//# sourceMappingURL=check-used.test.js.map