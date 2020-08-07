import Path from 'path';
import Test from 'ava';
import URL from 'url';

import { CheckDependencyProcess } from './check-dependency-process.js';

const FilePath = URL.fileURLToPath(import.meta.url);
const FolderPath = Path.dirname(FilePath);

// the resources in distributable are used because 
// and these tests don't rely on babel to copy 
// dot files (e.g. .babelrc.json)
const ResourcePath = Path.normalize(`${FolderPath}/resource`);

Test.serial('check-dependency --project-path no-issue', async test => {
  let process = new CheckDependencyProcess({ '--project-path': `${ResourcePath}/no-issue` });
  test.is(await process.whenExit(), 0);
});

Test.serial('check-dependency --project-path unused', async test => {
  let process = new CheckDependencyProcess({ '--project-path': `${ResourcePath}/unused` });
  test.is(await process.whenExit(), 1);
});

Test.serial('check-dependency --project-path unused --configuration-path unused/configuration.json', async test => {
  let process = new CheckDependencyProcess({ '--project-path': `${ResourcePath}/unused`, '--configuration-path': `${ResourcePath}/unused/configuration.json` });
  test.is(await process.whenExit(), 0);
});
//# sourceMappingURL=check-dependency.test.js.map