import Test from 'ava'

import { GetPackageName } from '../../library/get-package-name.js'

[
  [ './package.js', './package.js' ],
  [ './asd/package.js', './asd/package.js' ],
  [ '../package.js', '../package.js' ],
  [ '../asd/package.js', '../asd/package.js' ],
  [ 'mablung-package', 'mablung-package' ],
  [ 'mablung-package/install', 'mablung-package' ],
  [ 'mablung-package/install/install', 'mablung-package' ],
  [ 'module:mablung-package', 'mablung-package' ],
  [ 'module:mablung-package/install', 'mablung-package' ],
  [ 'module:mablung-package/install/install', 'mablung-package' ],
  [ '@virtualpatterns/mablung-package', '@virtualpatterns/mablung-package' ],
  [ '@virtualpatterns/mablung-package/install', '@virtualpatterns/mablung-package' ],
  [ '@virtualpatterns/mablung-package/install/install', '@virtualpatterns/mablung-package' ],
  [ 'module:@virtualpatterns/mablung-package', '@virtualpatterns/mablung-package' ],
  [ 'module:@virtualpatterns/mablung-package/install', '@virtualpatterns/mablung-package' ],
  [ 'module:@virtualpatterns/mablung-package/install/install', '@virtualpatterns/mablung-package' ]
].forEach(([input, output]) => {

  Test(`GetPackageName('${input}') returns '${output}'`, (test) => {
    test.is(GetPackageName(input), output)
  })

})
