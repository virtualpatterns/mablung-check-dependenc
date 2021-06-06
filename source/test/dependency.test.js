import Is from '@pwn/is'
import Test from 'ava'

import { Check } from '../index.js'

const Process = process

Test('dependency', async (test) => {

  let dependency = await Check(Process.cwd())

  test.true(Is.emptyObject(dependency.missing))
  test.deepEqual(dependency.unused, [])

})
