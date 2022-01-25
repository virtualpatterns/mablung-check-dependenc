import { CreateLoggedProcess } from '@virtualpatterns/mablung-worker/test'
import { ForkedProcess } from '@virtualpatterns/mablung-worker'
import FileSystem from 'fs-extra'
import Path from 'path'
import Test from 'ava'
import URL from 'url'

const FilePath = URL.fileURLToPath(import.meta.url)
const FolderPath = Path.dirname(FilePath)

const LogPath = FilePath.replace('/release/', '/data/').replace(/\.test\.c?js$/, '.log')
const LoggedProcess = CreateLoggedProcess(ForkedProcess, LogPath)
const ResourcePath = Path.resolve(FolderPath, 'resource')

Test.before(async () => {
  await FileSystem.ensureDir(Path.dirname(LogPath))
  return FileSystem.remove(LogPath)
})

Test('default', async (test) => {
  let process = new LoggedProcess(Path.resolve(FolderPath, '../../command/index.js'), { '--report-used': true })
  test.is(await process.whenExit(), 0)
})

Test('--help', async (test) => {
  let process = new LoggedProcess(Path.resolve(FolderPath, '../../command/index.js'), { '--help': true })
  test.is(await process.whenExit(), 0)
})

Test('--project-path no-issue', async (test) => {
  let process = new LoggedProcess(Path.resolve(FolderPath, '../../command/index.js'), { '--project-path': Path.resolve(ResourcePath, 'no-issue') })
  test.is(await process.whenExit(), 0)
})

Test('--project-path unused', async (test) => {
  let process = new LoggedProcess(Path.resolve(FolderPath, '../../command/index.js'), { '--project-path': Path.resolve(ResourcePath, 'unused') })
  test.is(await process.whenExit(), 1)
})

Test('--project-path unused --configuration-path unused/configuration.json', async (test) => {
  let process = new LoggedProcess(Path.resolve(FolderPath, '../../command/index.js'), { '--project-path': Path.resolve(ResourcePath, 'unused'), '--configuration-path': Path.resolve(ResourcePath, 'unused/configuration.json') })
  test.is(await process.whenExit(), 0)
})

Test('--project-path missing --report-missing', async (test) => {
  let process = new LoggedProcess(Path.resolve(FolderPath, '../../command/index.js'), { '--project-path': Path.resolve(ResourcePath, 'missing'), '--report-missing': true })
  test.is(await process.whenExit(), 1)
})

Test('--project-path missing --no-report-missing', async (test) => {
  let process = new LoggedProcess(Path.resolve(FolderPath, '../../command/index.js'), { '--project-path': Path.resolve(ResourcePath, 'missing'), '--no-report-missing': true })
  test.is(await process.whenExit(), 0)
})

Test('--project-path unused --report-unused', async (test) => {
  let process = new LoggedProcess(Path.resolve(FolderPath, '../../command/index.js'), { '--project-path': Path.resolve(ResourcePath, 'unused'), '--report-unused': true })
  test.is(await process.whenExit(), 1)
})

Test('--project-path unused --no-report-unused', async (test) => {
  let process = new LoggedProcess(Path.resolve(FolderPath, '../../command/index.js'), { '--project-path': Path.resolve(ResourcePath, 'unused'), '--no-report-unused': true })
  test.is(await process.whenExit(), 0)
})

Test('--project-path no-issue --report-used', async (test) => {
  let process = new LoggedProcess(Path.resolve(FolderPath, '../../command/index.js'), { '--project-path': Path.resolve(ResourcePath, 'no-issue'), '--report-used': true })
  test.is(await process.whenExit(), 0)
})

Test('--project-path error', async (test) => {
  let process = new LoggedProcess(Path.resolve(FolderPath, '../../command/index.js'), { '--project-path': Path.resolve(ResourcePath, 'error') })
  test.is(await process.whenExit(), 2)
})
