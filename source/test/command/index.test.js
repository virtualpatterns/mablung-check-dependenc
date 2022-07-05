import { CreateRandomId } from '@virtualpatterns/mablung-makefile/test'
import { LoggedForkedProcess } from '@virtualpatterns/mablung-worker/test'
import FileSystem from 'fs-extra'
import Path from 'path'
import Test from 'ava'
import URL from 'url'

const FilePath = URL.fileURLToPath(import.meta.url)
const FolderPath = Path.dirname(FilePath)

const DataPath = FilePath.replace('/release/', '/data/').replace('.test.js', '')
const ResourcePath = Path.resolve(FolderPath, 'resource')

Test.before(() => {
  return FileSystem.emptyDir(DataPath)
})

Test.beforeEach(async (test) => {

  let id = await CreateRandomId()
  let logPath = Path.resolve(DataPath, `${id}.log`)

  test.context.logPath = logPath

})

Test('default', async (test) => {
  let process = new LoggedForkedProcess(test.context.logPath, Path.resolve(FolderPath, '../../command/index.js'))
  test.is(await process.whenExit(), 0)
})

Test('--help', async (test) => {
  let process = new LoggedForkedProcess(test.context.logPath, Path.resolve(FolderPath, '../../command/index.js'), { '--help': true })
  test.is(await process.whenExit(), 0)
})

Test('--project-path section', async (test) => {
  let process = new LoggedForkedProcess(test.context.logPath, Path.resolve(FolderPath, '../../command/index.js'), { '--project-path': Path.resolve(ResourcePath, 'section') })
  test.is(await process.whenExit(), 1)
})

Test('--project-path section --no-report-section', async (test) => {
  let process = new LoggedForkedProcess(test.context.logPath, Path.resolve(FolderPath, '../../command/index.js'), { '--project-path': Path.resolve(ResourcePath, 'section'), '--no-report-section': true })
  test.is(await process.whenExit(), 0)
})

Test('--project-path no-issue', async (test) => {
  let process = new LoggedForkedProcess(test.context.logPath, Path.resolve(FolderPath, '../../command/index.js'), { '--project-path': Path.resolve(ResourcePath, 'no-issue') })
  test.is(await process.whenExit(), 0)
})

Test('--project-path unused', async (test) => {
  let process = new LoggedForkedProcess(test.context.logPath, Path.resolve(FolderPath, '../../command/index.js'), { '--project-path': Path.resolve(ResourcePath, 'unused') })
  test.is(await process.whenExit(), 1)
})

Test('--project-path unused --configuration-path unused/configuration.json', async (test) => {
  let process = new LoggedForkedProcess(test.context.logPath, Path.resolve(FolderPath, '../../command/index.js'), { '--project-path': Path.resolve(ResourcePath, 'unused'), '--configuration-path': Path.resolve(ResourcePath, 'unused/configuration.json') })
  test.is(await process.whenExit(), 0)
})

Test('--project-path missing --report-missing', async (test) => {
  let process = new LoggedForkedProcess(test.context.logPath, Path.resolve(FolderPath, '../../command/index.js'), { '--project-path': Path.resolve(ResourcePath, 'missing'), '--report-missing': true })
  test.is(await process.whenExit(), 1)
})

Test('--project-path missing --no-report-section --no-report-missing', async (test) => {
  let process = new LoggedForkedProcess(test.context.logPath, Path.resolve(FolderPath, '../../command/index.js'), { '--project-path': Path.resolve(ResourcePath, 'missing'), '--no-report-section': true, '--no-report-missing': true })
  test.is(await process.whenExit(), 0)
})

Test('--project-path unused --report-unused', async (test) => {
  let process = new LoggedForkedProcess(test.context.logPath, Path.resolve(FolderPath, '../../command/index.js'), { '--project-path': Path.resolve(ResourcePath, 'unused'), '--report-unused': true })
  test.is(await process.whenExit(), 1)
})

Test('--project-path unused --no-report-unused', async (test) => {
  let process = new LoggedForkedProcess(test.context.logPath, Path.resolve(FolderPath, '../../command/index.js'), { '--project-path': Path.resolve(ResourcePath, 'unused'), '--no-report-unused': true })
  test.is(await process.whenExit(), 0)
})

Test('--project-path no-issue --report-used', async (test) => {
  let process = new LoggedForkedProcess(test.context.logPath, Path.resolve(FolderPath, '../../command/index.js'), { '--project-path': Path.resolve(ResourcePath, 'no-issue'), '--report-used': true })
  test.is(await process.whenExit(), 0)
})

Test('--project-path error', async (test) => {
  let process = new LoggedForkedProcess(test.context.logPath, Path.resolve(FolderPath, '../../command/index.js'), { '--project-path': Path.resolve(ResourcePath, 'error') })
  test.is(await process.whenExit(), 2)
})
