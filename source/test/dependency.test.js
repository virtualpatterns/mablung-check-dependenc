import Test from 'ava'

import { Check } from '../index.js'

Test('default', async (test) => {

  let dependency = await Check()
  
  test.deepEqual(dependency.missing, {})
  test.deepEqual(dependency.unused, [])

})
