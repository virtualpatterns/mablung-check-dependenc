import { createRequire as CreateRequire } from 'module';
import Test from 'ava';

import { Ava } from '../../../library/special/ava.js';

const Require = CreateRequire(import.meta.url);

Test('Ava(\'no-ava/package.json\')', async test => {
  test.deepEqual(await Ava(Require.resolve('./resource/ava/no-ava/package.json')), []);
});

Test('Ava(\'no-require/package.json\')', async test => {
  test.deepEqual(await Ava(Require.resolve('./resource/ava/no-require/package.json')), []);
});

Test('Ava(\'no-require/ava.config.json\')', async test => {
  test.deepEqual(await Ava(Require.resolve('./resource/ava/no-require/ava.config.json')), []);
});

Test('Ava(\'require/package.json\')', async test => {
  test.deepEqual(await Ava(Require.resolve('./resource/ava/require/package.json')), ['@virtualpatterns/mablung-source-map-support', '@virtualpatterns/mablung-dependency']);
});

Test('Ava(\'require/ava.config.json\')', async test => {
  test.deepEqual(await Ava(Require.resolve('./resource/ava/require/ava.config.json')), ['@virtualpatterns/mablung-source-map-support', '@virtualpatterns/mablung-dependency']);
});
//# sourceMappingURL=ava.test.js.map