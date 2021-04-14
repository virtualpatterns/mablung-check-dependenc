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

Test.only('check-dependency', async test => {
  let process = new CheckDependencyProcess();
  test.is(await process.whenExit(), 0);
});

Test('check-dependency --help', async test => {
  let process = new CheckDependencyProcess({ '--help': true });
  test.is(await process.whenExit(), 0);
});

Test('check-dependency --project-path no-issue', async test => {
  let process = new CheckDependencyProcess({ '--project-path': `${ResourcePath}/no-issue` });
  test.is(await process.whenExit(), 0);
});

Test('check-dependency --project-path unused', async test => {
  let process = new CheckDependencyProcess({ '--project-path': `${ResourcePath}/unused` });
  test.is(await process.whenExit(), 1);
});

Test('check-dependency --project-path unused --configuration-path unused/configuration.json', async test => {
  let process = new CheckDependencyProcess({ '--project-path': `${ResourcePath}/unused`, '--configuration-path': `${ResourcePath}/unused/configuration.json` });
  test.is(await process.whenExit(), 0);
});

Test('check-dependency --project-path missing --report-missing', async test => {
  let process = new CheckDependencyProcess({ '--project-path': `${ResourcePath}/missing`, '--report-missing': true });
  test.is(await process.whenExit(), 1);
});

Test('check-dependency --project-path missing --no-report-missing', async test => {
  let process = new CheckDependencyProcess({ '--project-path': `${ResourcePath}/missing`, '--no-report-missing': true });
  test.is(await process.whenExit(), 0);
});

Test('check-dependency --project-path unused --report-unused', async test => {
  let process = new CheckDependencyProcess({ '--project-path': `${ResourcePath}/unused`, '--report-unused': true });
  test.is(await process.whenExit(), 1);
});

Test('check-dependency --project-path unused --no-report-unused', async test => {
  let process = new CheckDependencyProcess({ '--project-path': `${ResourcePath}/unused`, '--no-report-unused': true });
  test.is(await process.whenExit(), 0);
});

Test('check-dependency --project-path no-issue --report-used', async test => {
  let process = new CheckDependencyProcess({ '--project-path': `${ResourcePath}/no-issue`, '--report-used': true });
  test.is(await process.whenExit(), 0);
});

Test('check-dependency --project-path error', async test => {
  let process = new CheckDependencyProcess({ '--project-path': `${ResourcePath}/error` });
  test.is(await process.whenExit(), 2);
});
//# sourceMappingURL=check-dependency.test.js.map