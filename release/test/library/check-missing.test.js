import Path from 'path';
import Test from 'ava';
import URL from 'url';

import { Check } from '../../index.js';

const FilePath = URL.fileURLToPath(import.meta.url);
const FolderPath = Path.dirname(FilePath);

const ResourcePath = Path.normalize(`${FolderPath}/resource/missing`);

Test('Check(\'dependency\')', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/dependency`), {
    'missing': {
      '@virtualpatterns/mablung-dependency': [`${ResourcePath}/dependency/dependency.js`] },

    'unused': [],
    'used': {
      '@virtualpatterns/mablung-dependency': [`${ResourcePath}/dependency/dependency.js`] } });


});

//# sourceMappingURL=check-missing.test.js.map