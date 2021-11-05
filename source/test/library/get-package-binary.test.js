import Path from 'path'
import Test from 'ava'
import URL from 'url'

import { GetPackageBinary } from '../../library/get-package-binary.js'

const FilePath = URL.fileURLToPath(import.meta.url)
const FolderPath = Path.dirname(FilePath)

const ResourcePath = `${FolderPath}/resource/get-package-binary`

Test('default', async (test) => {
  test.deepEqual(await GetPackageBinary(`${ResourcePath}/default`), [
    {
      binary: 'dependency-0',
      name: 'dependency-0'
    },
    {
      binary: 'dependency-1-0',
      name: 'dependency-1'
    },
    {
      binary: 'dependency-1-1',
      name: 'dependency-1'
    }
  ])
})
