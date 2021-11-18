import Path from 'path'
import Test from 'ava'
import URL from 'url'

import { GetBinary } from '../../library/get-binary.js'

const FilePath = URL.fileURLToPath(import.meta.url)
const FolderPath = Path.dirname(FilePath)

const ResourcePath = `${FolderPath}/resource/get-binary`

Test('default', async (test) => {
  test.deepEqual(await GetBinary(`${ResourcePath}/default`), [
    {
      'binaryName': 'package-0',
      'binaryPattern': /(?:\s|\(|\/)package-0(?:\)|\s|$)/m,
      'packageName': 'package-0'
    },
    {
      'binaryName': 'package-1-0',
      'binaryPattern': /(?:\s|\(|\/)package-1-0(?:\)|\s|$)/m,
      'packageName': 'package-1'
    },
    {
      'binaryName': 'package-1-1',
      'binaryPattern': /(?:\s|\(|\/)package-1-1(?:\)|\s|$)/m,
      'packageName': 'package-1'
    }
  ])
})
