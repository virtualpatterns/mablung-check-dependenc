# mablung-check-dependency

## Note

* `depcheck` reports `@virtualpatterns/mablung-source-map-support/install` as missing although `@virtualpatterns/mablung-source-map-support` is a dependency in `package.json`.  It is added to `ignoreMatch` in `check-dependency.json` as a result.
* Warning: Introducing the "exports" field prevents consumers of a package from using any entry points that are not defined, including the package.json (e.g. require('your-package/package.json'). This will likely be a breaking change.