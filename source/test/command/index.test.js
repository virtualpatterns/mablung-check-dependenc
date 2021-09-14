import { CreateLoggedProcess, ForkedProcess } from '@virtualpatterns/mablung-worker'
import { createRequire as CreateRequire } from 'module'
import FileSystem from 'fs-extra'
import Path from 'path'
import Test from 'ava'
import URL from 'url'

const FilePath = URL.fileURLToPath(import.meta.url)
const FolderPath = Path.dirname(FilePath)
const LogPath = FilePath.replace(/\/release\//, '/data/').replace(/\.c?js$/, '.log')
const Require = CreateRequire(import.meta.url)

const LoggedProcess = CreateLoggedProcess(ForkedProcess, LogPath)
const ResourcePath = `${FolderPath}/resource`

Test.before(async () => {
  await FileSystem.ensureDir(Path.dirname(LogPath))
  await FileSystem.remove(LogPath)
})

Test('default', async (test) => {
  let process = new LoggedProcess(Require.resolve('../../command/index.js'), { '--report-used': true })
  test.is(await process.whenExit(), 0)
})

Test('--help', async (test) => {
  let process = new LoggedProcess(Require.resolve('../../command/index.js'), { '--help': true })
  test.is(await process.whenExit(), 0)
})

Test('--project-path no-issue', async (test) => {
  let process = new LoggedProcess(Require.resolve('../../command/index.js'), { '--project-path': `${ResourcePath}/no-issue` })
  test.is(await process.whenExit(), 0)
})

Test('--project-path unused', async (test) => {
  let process = new LoggedProcess(Require.resolve('../../command/index.js'), { '--project-path': `${ResourcePath}/unused` })
  test.is(await process.whenExit(), 1)
})

Test('--project-path unused --configuration-path unused/configuration.json', async (test) => {
  let process = new LoggedProcess(Require.resolve('../../command/index.js'), { '--project-path': `${ResourcePath}/unused`, '--configuration-path': `${ResourcePath}/unused/configuration.json` })
  test.is(await process.whenExit(), 0)
})

Test('--project-path missing --report-missing', async (test) => {
  let process = new LoggedProcess(Require.resolve('../../command/index.js'), { '--project-path': `${ResourcePath}/missing`, '--report-missing': true })
  test.is(await process.whenExit(), 1)
})

Test('--project-path missing --no-report-missing', async (test) => {
  let process = new LoggedProcess(Require.resolve('../../command/index.js'), { '--project-path': `${ResourcePath}/missing`, '--no-report-missing': true })
  test.is(await process.whenExit(), 0)
})

Test('--project-path unused --report-unused', async (test) => {
  let process = new LoggedProcess(Require.resolve('../../command/index.js'), { '--project-path': `${ResourcePath}/unused`, '--report-unused': true })
  test.is(await process.whenExit(), 1)
})

Test('--project-path unused --no-report-unused', async (test) => {
  let process = new LoggedProcess(Require.resolve('../../command/index.js'), { '--project-path': `${ResourcePath}/unused`, '--no-report-unused': true })
  test.is(await process.whenExit(), 0)
})

Test('--project-path no-issue --report-used', async (test) => {
  let process = new LoggedProcess(Require.resolve('../../command/index.js'), { '--project-path': `${ResourcePath}/no-issue`, '--report-used': true })
  test.is(await process.whenExit(), 0)
})

Test('--project-path error', async (test) => {
  let process = new LoggedProcess(Require.resolve('../../command/index.js'), { '--project-path': `${ResourcePath}/error` })
  test.is(await process.whenExit(), 2)
})
