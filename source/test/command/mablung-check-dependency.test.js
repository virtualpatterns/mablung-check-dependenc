import Path from 'path'
import Test from 'ava'
import URL from 'url'

import { MablungCheckDependencyProcess } from './mablung-check-dependency-process.js'

const FilePath = URL.fileURLToPath(import.meta.url)
const FolderPath = Path.dirname(FilePath)

const ResourcePath = `${FolderPath}/resource`

Test('default', async (test) => {
  let process = new MablungCheckDependencyProcess({ '--report-used': true })
  test.is(await process.whenExit(), 0)
})

Test('--help', async (test) => {
  let process = new MablungCheckDependencyProcess({ '--help': true })
  test.is(await process.whenExit(), 0)
})

Test('--project-path no-issue', async (test) => {
  let process = new MablungCheckDependencyProcess({ '--project-path': `${ResourcePath}/no-issue` })
  test.is(await process.whenExit(), 0)
})

Test('--project-path unused', async (test) => {
  let process = new MablungCheckDependencyProcess({ '--project-path': `${ResourcePath}/unused` })
  test.is(await process.whenExit(), 1)
})

Test('--project-path unused --configuration-path unused/configuration.json', async (test) => {
  let process = new MablungCheckDependencyProcess({ '--project-path': `${ResourcePath}/unused`, '--configuration-path': `${ResourcePath}/unused/configuration.json` })
  test.is(await process.whenExit(), 0)
})

Test('--project-path missing --report-missing', async (test) => {
  let process = new MablungCheckDependencyProcess({ '--project-path': `${ResourcePath}/missing`, '--report-missing': true })
  test.is(await process.whenExit(), 1)
})

Test('--project-path missing --no-report-missing', async (test) => {
  let process = new MablungCheckDependencyProcess({ '--project-path': `${ResourcePath}/missing`, '--no-report-missing': true })
  test.is(await process.whenExit(), 0)
})

Test('--project-path unused --report-unused', async (test) => {
  let process = new MablungCheckDependencyProcess({ '--project-path': `${ResourcePath}/unused`, '--report-unused': true })
  test.is(await process.whenExit(), 1)
})

Test('--project-path unused --no-report-unused', async (test) => {
  let process = new MablungCheckDependencyProcess({ '--project-path': `${ResourcePath}/unused`, '--no-report-unused': true })
  test.is(await process.whenExit(), 0)
})

Test('--project-path no-issue --report-used', async (test) => {
  let process = new MablungCheckDependencyProcess({ '--project-path': `${ResourcePath}/no-issue`, '--report-used': true })
  test.is(await process.whenExit(), 0)
})

Test('--project-path error', async (test) => {
  let process = new MablungCheckDependencyProcess({ '--project-path': `${ResourcePath}/error` })
  test.is(await process.whenExit(), 2)
})
