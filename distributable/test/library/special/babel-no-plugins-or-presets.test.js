import { createRequire as CreateRequire } from 'module';
import Path from 'path';
import Test from 'ava';
import URL from 'url';

import { Babel } from '../../../library/special/babel.js';

const FilePath = URL.fileURLToPath(import.meta.url);
const FolderPath = Path.dirname(FilePath);

const Require = CreateRequire(import.meta.url);

// the resources in source are used because 
// babel doesn't copy dot files (e.g. .babelrc.json)
const ResourcePath = Path.normalize(`${FolderPath}/../../../../source/test/library/special/resource/babel/no-plugins-or-presets`);

Test('Babel(\'.babelrc.json\', [])', async test => {
  test.deepEqual(await Babel(Require.resolve(`${ResourcePath}/.babelrc.json`), []), []);
});

Test('Babel(\'babel.config.json\', [])', async test => {
  test.deepEqual(await Babel(Require.resolve(`${ResourcePath}/babel.config.json`), []), []);
});

Test('Babel(\'package.json\', [])', async test => {
  test.deepEqual(await Babel(Require.resolve(`${ResourcePath}/package.json`), []), []);
});
//# sourceMappingURL=babel-no-plugins-or-presets.test.js.map