import { createRequire as CreateRequire } from 'module'
import Test from 'ava'

import { Browser } from '../../../library/parser/browser.js'

const Require = CreateRequire(import.meta.url)

Test('Browser(\'browser.json\'), [])', async (test) => {
  test.deepEqual( await Browser(Require.resolve('./resource/browser/browser.json'), []), [ 'stream-browserify', 'util' ])
})

Test('Browser(\'no-browser.json\'), [])', async (test) => {
  test.deepEqual( await Browser(Require.resolve('./resource/browser/no-browser.json'), []), [])
})
