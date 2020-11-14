import Test from 'ava'

import { GetDependencyName } from '../../library/get-dependency-name.js'

[
  [ './dependency.js', './dependency.js' ],
  [ './asd/dependency.js', './asd/dependency.js' ],
  [ '../dependency.js', '../dependency.js' ],
  [ '../asd/dependency.js', '../asd/dependency.js' ],
  [ 'mablung-dependency', 'mablung-dependency' ],
  [ 'mablung-dependency/install', 'mablung-dependency' ],
  [ 'mablung-dependency/install/install', 'mablung-dependency' ],
  [ '@virtualpatterns/mablung-dependency', '@virtualpatterns/mablung-dependency' ],
  [ '@virtualpatterns/mablung-dependency/install', '@virtualpatterns/mablung-dependency' ],
  [ '@virtualpatterns/mablung-dependency/install/install', '@virtualpatterns/mablung-dependency' ]
].forEach(([input, output]) => {

  Test(`GetDependencyName('${input}') returns '${output}'`, (test) => {
    test.is(GetDependencyName(input), output)
  })

})

// Test('@virtualpatterns/mablung-dependency', (test) => {
//   test.is(GetDependencyName(test.title), '@virtualpatterns/mablung-dependency')
// })

// Test('@virtualpatterns/mablung-dependency/install', (test) => {
//   test.is(GetDependencyName(test.title), '@virtualpatterns/mablung-dependency')
// })
