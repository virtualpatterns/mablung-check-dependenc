import Test from 'ava'

import { GetBinaryName } from '../../library/get-binary-name.js'

[
  [ 'mablung-package', 'mablung-package' ],
  [ '@virtualpatterns/mablung-package', 'mablung-package' ]
].forEach(([ input, output ]) => {

  Test(`GetBinaryName('${input}') returns '${output}'`, (test) => {
    test.is(GetBinaryName(input), output)
  })

})
