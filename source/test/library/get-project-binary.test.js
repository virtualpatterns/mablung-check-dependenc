import Path from 'path'
import Test from 'ava'
import URL from 'url'

import { GetProjectBinary } from '../../library/get-project-binary.js'

const FilePath = URL.fileURLToPath(import.meta.url)
const FolderPath = Path.dirname(FilePath)

const ResourcePath = Path.resolve(FolderPath, 'resource/get-project-binary')

Test('default', async (test) => {
  test.deepEqual((await GetProjectBinary(Path.resolve(ResourcePath, 'default'))).flat(Infinity), [
    {
      'binary': {
        'name': 'package-0',
        'path': Path.resolve(ResourcePath, 'default/node_modules/package-0/lib/cli.js'),
        'pattern': /(?:\s|\(|\/)package-0(?:\)|\s|$)/m
      },
      'package': {
        'name': 'package-0',
        'path': Path.resolve(ResourcePath, 'default/node_modules/package-0/package.json')
      }
    },
    {
      'binary': {
        'name': 'package-1-0',
        'path': Path.resolve(ResourcePath, 'default/node_modules/package-1/lib/cli.js'),
        'pattern': /(?:\s|\(|\/)package-1-0(?:\)|\s|$)/m
      },
      'package': {
        'name': 'package-1',
        'path': Path.resolve(ResourcePath, 'default/node_modules/package-1/package.json')
      }
    },
    {
      'binary': {
        'name': 'package-1-1',
        'path': Path.resolve(ResourcePath, 'default/node_modules/package-1/lib/cli.js'),
        'pattern': /(?:\s|\(|\/)package-1-1(?:\)|\s|$)/m
      },
      'package': {
        'name': 'package-1',
        'path': Path.resolve(ResourcePath, 'default/node_modules/package-1/package.json')
      }
    }
  ])
})
