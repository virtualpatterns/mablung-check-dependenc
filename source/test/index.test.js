import Test from 'ava'

;[
  'Check',
  'FileParseError',
  'FolderParseError'
].forEach((name) => {

  Test(name, async (test) => {
    test.truthy(await import('@virtualpatterns/mablung-check-dependency') .then((module) => module[name]))
  })
  
})
