import Test from 'ava'

import { Check } from '../index.js'

const Process = process

Test('(default)', async (test) => {

  let dependency = await Check(Process.cwd())

  test.deepEqual(dependency.missing, {})
  test.deepEqual(dependency.unused, [])

})
