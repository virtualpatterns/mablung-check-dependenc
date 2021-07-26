import Path from 'path'
import Test from 'ava'
import URL from 'url'

import { Check } from '../../index.js'

const FilePath = URL.fileURLToPath(import.meta.url)
const FolderPath = Path.dirname(FilePath)

// the resources in source are used because 
// babel doesn't copy dot files (e.g. .babelrc.json)
const ResourcePath = Path.normalize(`${FolderPath}/../../../source/test/library/resource/babel`)

// .babelrc.json

Test('Check(\'babelrc/used/rename-dependency/environment/plugin-and-preset\', {})', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/babelrc/used/rename-dependency/environment/plugin-and-preset`, {}), { 
    'missing': {}, 
    'unused': [],
    'used': {
      'babel-plugin-proposal-export-default-from': [ `${ResourcePath}/babelrc/used/rename-dependency/environment/plugin-and-preset/.babelrc.json` ],
      'babel-plugin-replace-identifier': [ `${ResourcePath}/babelrc/used/rename-dependency/environment/plugin-and-preset/.babelrc.json` ],
      'babel-preset-export-default-from': [ `${ResourcePath}/babelrc/used/rename-dependency/environment/plugin-and-preset/.babelrc.json` ],
      'babel-preset-env': [ `${ResourcePath}/babelrc/used/rename-dependency/environment/plugin-and-preset/.babelrc.json` ]
    }
  })
})

// babel.config.json

Test('Check(\'babel-config/used/rename-dependency/environment/plugin-and-preset\', {})', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/babel-config/used/rename-dependency/environment/plugin-and-preset`, {}), { 
    'missing': {}, 
    'unused': [],
    'used': {
      'babel-plugin-proposal-export-default-from': [ `${ResourcePath}/babel-config/used/rename-dependency/environment/plugin-and-preset/babel.config.json` ],
      'babel-plugin-replace-identifier': [ `${ResourcePath}/babel-config/used/rename-dependency/environment/plugin-and-preset/babel.config.json` ],
      'babel-preset-export-default-from': [ `${ResourcePath}/babel-config/used/rename-dependency/environment/plugin-and-preset/babel.config.json` ],
      'babel-preset-env': [ `${ResourcePath}/babel-config/used/rename-dependency/environment/plugin-and-preset/babel.config.json` ]
    }
  })
})

// package.json

// Test.only('Check(\'package/miscellaneous\', {})', async (test) => {
//   test.deepEqual(await Check(`${ResourcePath}/package/miscellaneous`, {}), {
//     'missing': {},
//     'unused': [],
//     'used': {
//       './release/index.cjs': [`${ResourcePath}/package/miscellaneous/package.json`]
//     }
//   })
// })

Test('Check(\'package/missing/environment/plugin\', {})', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/package/missing/environment/plugin`, {}), { 
    'missing': {
      'proposal-export-default-from': [ `${ResourcePath}/package/missing/environment/plugin/package.json` ],
      'replace-identifier': [ `${ResourcePath}/package/missing/environment/plugin/package.json` ]
    }, 
    'unused': [],
    'used': {
      'proposal-export-default-from': [ `${ResourcePath}/package/missing/environment/plugin/package.json` ],
      'replace-identifier': [ `${ResourcePath}/package/missing/environment/plugin/package.json` ]
    }
  })
})

Test('Check(\'package/missing/environment/plugin-and-preset\', {})', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/package/missing/environment/plugin-and-preset`, {}), { 
    'missing': {
      'proposal-export-default-from': [ `${ResourcePath}/package/missing/environment/plugin-and-preset/package.json` ],
      'replace-identifier': [ `${ResourcePath}/package/missing/environment/plugin-and-preset/package.json` ],
      'export-default-from': [ `${ResourcePath}/package/missing/environment/plugin-and-preset/package.json` ],
      'env': [ `${ResourcePath}/package/missing/environment/plugin-and-preset/package.json` ]
    }, 
    'unused': [],
    'used': {
      'proposal-export-default-from': [ `${ResourcePath}/package/missing/environment/plugin-and-preset/package.json` ],
      'replace-identifier': [ `${ResourcePath}/package/missing/environment/plugin-and-preset/package.json` ],
      'export-default-from': [ `${ResourcePath}/package/missing/environment/plugin-and-preset/package.json` ],
      'env': [ `${ResourcePath}/package/missing/environment/plugin-and-preset/package.json` ]
    }
  })
})

Test('Check(\'package/missing/environment/preset\', {})', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/package/missing/environment/preset`, {}), { 
    'missing': {
      'export-default-from': [ `${ResourcePath}/package/missing/environment/preset/package.json` ],
      'env': [ `${ResourcePath}/package/missing/environment/preset/package.json` ]
    }, 
    'unused': [],
    'used': {
      'export-default-from': [ `${ResourcePath}/package/missing/environment/preset/package.json` ],
      'env': [ `${ResourcePath}/package/missing/environment/preset/package.json` ]
    }
  })
})

Test('Check(\'package/missing/no-environment/plugin\', {})', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/package/missing/no-environment/plugin`, {}), { 
    'missing': {
      'proposal-export-default-from': [ `${ResourcePath}/package/missing/no-environment/plugin/package.json` ],
      'replace-identifier': [ `${ResourcePath}/package/missing/no-environment/plugin/package.json` ]
    }, 
    'unused': [],
    'used': {
      'proposal-export-default-from': [ `${ResourcePath}/package/missing/no-environment/plugin/package.json` ],
      'replace-identifier': [ `${ResourcePath}/package/missing/no-environment/plugin/package.json` ]
    }
  })
})

Test('Check(\'package/missing/no-environment/plugin-and-preset\', {})', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/package/missing/no-environment/plugin-and-preset`, {}), { 
    'missing': {
      'proposal-export-default-from': [ `${ResourcePath}/package/missing/no-environment/plugin-and-preset/package.json` ],
      'replace-identifier': [ `${ResourcePath}/package/missing/no-environment/plugin-and-preset/package.json` ],
      'export-default-from': [ `${ResourcePath}/package/missing/no-environment/plugin-and-preset/package.json` ],
      'env': [ `${ResourcePath}/package/missing/no-environment/plugin-and-preset/package.json` ]
    }, 
    'unused': [],
    'used': {
      'proposal-export-default-from': [ `${ResourcePath}/package/missing/no-environment/plugin-and-preset/package.json` ],
      'replace-identifier': [ `${ResourcePath}/package/missing/no-environment/plugin-and-preset/package.json` ],
      'export-default-from': [ `${ResourcePath}/package/missing/no-environment/plugin-and-preset/package.json` ],
      'env': [ `${ResourcePath}/package/missing/no-environment/plugin-and-preset/package.json` ]
    }
  })
})

Test('Check(\'package/missing/no-environment/preset\', {})', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/package/missing/no-environment/preset`, {}), { 
    'missing': {
      'export-default-from': [ `${ResourcePath}/package/missing/no-environment/preset/package.json` ],
      'env': [ `${ResourcePath}/package/missing/no-environment/preset/package.json` ]
    }, 
    'unused': [],
    'used': {
      'export-default-from': [ `${ResourcePath}/package/missing/no-environment/preset/package.json` ],
      'env': [ `${ResourcePath}/package/missing/no-environment/preset/package.json` ]
    }
  })
})

Test('Check(\'package/no-babel\', {})', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/package/no-babel`, {}), { 
    'missing': {}, 
    'unused': [],
    'used': {}
  })
})

Test('Check(\'package/unused/environment/no-plugin-or-preset/\', {})', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/package/unused/environment/no-plugin-or-preset/`, {}), { 
    'missing': {}, 
    'unused': [
      'babel-plugin-proposal-export-default-from',
      'babel-plugin-replace-identifier',
      'babel-preset-export-default-from',
      'babel-preset-env'
    ],
    'used': {}
  })
})

Test('Check(\'package/unused/no-environment/no-plugin-or-preset/\', {})', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/package/unused/no-environment/no-plugin-or-preset/`, {}), { 
    'missing': {}, 
    'unused': [
      'babel-plugin-proposal-export-default-from',
      'babel-plugin-replace-identifier',
      'babel-preset-export-default-from',
      'babel-preset-env'
    ],
    'used': {}
  })
})

Test('Check(\'package/used/rename-dependency/environment/plugin\', {})', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/package/used/rename-dependency/environment/plugin`, {}), { 
    'missing': {}, 
    'unused': [],
    'used': {
      'babel-plugin-proposal-export-default-from': [ `${ResourcePath}/package/used/rename-dependency/environment/plugin/package.json` ],
      'babel-plugin-replace-identifier': [ `${ResourcePath}/package/used/rename-dependency/environment/plugin/package.json` ]
    }
  })
})

Test('Check(\'package/used/rename-dependency/environment/plugin-and-preset\', {})', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/package/used/rename-dependency/environment/plugin-and-preset`, {}), { 
    'missing': {}, 
    'unused': [],
    'used': {
      'babel-plugin-proposal-export-default-from': [ `${ResourcePath}/package/used/rename-dependency/environment/plugin-and-preset/package.json` ],
      'babel-plugin-replace-identifier': [ `${ResourcePath}/package/used/rename-dependency/environment/plugin-and-preset/package.json` ],
      'babel-preset-export-default-from': [ `${ResourcePath}/package/used/rename-dependency/environment/plugin-and-preset/package.json` ],
      'babel-preset-env': [ `${ResourcePath}/package/used/rename-dependency/environment/plugin-and-preset/package.json` ]
    }
  })
})

Test('Check(\'package/used/rename-dependency/environment/preset\', {})', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/package/used/rename-dependency/environment/preset`, {}), { 
    'missing': {}, 
    'unused': [],
    'used': {
      'babel-preset-export-default-from': [ `${ResourcePath}/package/used/rename-dependency/environment/preset/package.json` ],
      'babel-preset-env': [ `${ResourcePath}/package/used/rename-dependency/environment/preset/package.json` ]
    }
  })
})

Test('Check(\'package/used/rename-dependency/no-environment/plugin\', {})', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/package/used/rename-dependency/no-environment/plugin`, {}), { 
    'missing': {}, 
    'unused': [],
    'used': {
      'babel-plugin-proposal-export-default-from': [ `${ResourcePath}/package/used/rename-dependency/no-environment/plugin/package.json` ],
      'babel-plugin-replace-identifier': [ `${ResourcePath}/package/used/rename-dependency/no-environment/plugin/package.json` ]
    }
  })
})

Test('Check(\'package/used/rename-dependency/no-environment/plugin-and-preset\', {})', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/package/used/rename-dependency/no-environment/plugin-and-preset`, {}), { 
    'missing': {},
    'unused': [],
    'used': {
      'babel-plugin-proposal-export-default-from': [ `${ResourcePath}/package/used/rename-dependency/no-environment/plugin-and-preset/package.json` ],
      'babel-plugin-replace-identifier': [ `${ResourcePath}/package/used/rename-dependency/no-environment/plugin-and-preset/package.json` ],
      'babel-preset-export-default-from': [ `${ResourcePath}/package/used/rename-dependency/no-environment/plugin-and-preset/package.json` ],
      'babel-preset-env': [ `${ResourcePath}/package/used/rename-dependency/no-environment/plugin-and-preset/package.json` ]
    }
  })
})

Test('Check(\'package/used/rename-dependency/no-environment/preset\', {})', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/package/used/rename-dependency/no-environment/preset`, {}), { 
    'missing': {}, 
    'unused': [],
    'used': {
      'babel-preset-export-default-from': [ `${ResourcePath}/package/used/rename-dependency/no-environment/preset/package.json` ],
      'babel-preset-env': [ `${ResourcePath}/package/used/rename-dependency/no-environment/preset/package.json` ]
    }
  })
})

Test('Check(\'package/used/same-name-dependency/environment/plugin\', {})', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/package/used/same-name-dependency/environment/plugin`, {}), { 
    'missing': {}, 
    'unused': [],
    'used': {
      'proposal-export-default-from': [ `${ResourcePath}/package/used/same-name-dependency/environment/plugin/package.json` ],
      'replace-identifier': [ `${ResourcePath}/package/used/same-name-dependency/environment/plugin/package.json` ]
    }
  })
})

Test('Check(\'package/used/same-name-dependency/environment/plugin-and-preset\', {})', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/package/used/same-name-dependency/environment/plugin-and-preset`, {}), { 
    'missing': {}, 
    'unused': [],
    'used': {
      'proposal-export-default-from': [ `${ResourcePath}/package/used/same-name-dependency/environment/plugin-and-preset/package.json` ],
      'replace-identifier': [ `${ResourcePath}/package/used/same-name-dependency/environment/plugin-and-preset/package.json` ],
      'export-default-from': [ `${ResourcePath}/package/used/same-name-dependency/environment/plugin-and-preset/package.json` ],
      'env': [ `${ResourcePath}/package/used/same-name-dependency/environment/plugin-and-preset/package.json` ]
    }
  })
})

Test('Check(\'package/used/same-name-dependency/environment/preset\', {})', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/package/used/same-name-dependency/environment/preset`, {}), { 
    'missing': {}, 
    'unused': [],
    'used': {
      'export-default-from': [ `${ResourcePath}/package/used/same-name-dependency/environment/preset/package.json` ],
      'env': [ `${ResourcePath}/package/used/same-name-dependency/environment/preset/package.json` ]
    }
  })
})

Test('Check(\'package/used/same-name-dependency/no-environment/plugin\', {})', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/package/used/same-name-dependency/no-environment/plugin`, {}), { 
    'missing': {}, 
    'unused': [],
    'used': {
      'proposal-export-default-from': [ `${ResourcePath}/package/used/same-name-dependency/no-environment/plugin/package.json` ],
      'replace-identifier': [ `${ResourcePath}/package/used/same-name-dependency/no-environment/plugin/package.json` ]
    }
  })
})

Test('Check(\'package/used/same-name-dependency/no-environment/plugin-and-preset\', {})', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/package/used/same-name-dependency/no-environment/plugin-and-preset`, {}), { 
    'missing': {}, 
    'unused': [],
    'used': {
      'proposal-export-default-from': [ `${ResourcePath}/package/used/same-name-dependency/no-environment/plugin-and-preset/package.json` ],
      'replace-identifier': [ `${ResourcePath}/package/used/same-name-dependency/no-environment/plugin-and-preset/package.json` ],
      'export-default-from': [ `${ResourcePath}/package/used/same-name-dependency/no-environment/plugin-and-preset/package.json` ],
      'env': [ `${ResourcePath}/package/used/same-name-dependency/no-environment/plugin-and-preset/package.json` ]
    }
  })
})

Test('Check(\'package/used/same-name-dependency/no-environment/preset\', {})', async (test) => {
  test.deepEqual(await Check(`${ResourcePath}/package/used/same-name-dependency/no-environment/preset`, {}), { 
    'missing': {}, 
    'unused': [],
    'used': {
      'export-default-from': [ `${ResourcePath}/package/used/same-name-dependency/no-environment/preset/package.json` ],
      'env': [ `${ResourcePath}/package/used/same-name-dependency/no-environment/preset/package.json` ]
    }
  })
})
