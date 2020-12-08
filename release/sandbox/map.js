import Transform from 'node-json-transform';

async function main() {

  try {

    let source = {
      'ignorePattern': [
      'distributable'],

      'parser': {
        '*.js': 'es6',
        '*.cjs': 'es6' },

      'special': [
      'bin',
      'eslint'],

      'package': {
        // may specify dependencies instead of parsing package.json
        'dependency': {
          'lodash': '^4.17.15' },

        'devDependency': {
          'eslint': '^6.6.0' },

        'peerDependency': {},
        'optionalDependency': {} } };



    let map = {
      'item': {
        'ignoreMatches': 'ignoreMatch',
        'ignorePatterns': 'ignorePattern',
        'package': {
          'dependencies': 'package.dependency',
          'devDependencies': 'package.devDependency',
          'peerDependencies': 'package.peerDependency',
          'optionalDependencies': 'package.optionalDependency' } } };




    let target = await Transform.transformAsync(source, map);

    console.dir(source);
    console.dir(target);

  } catch (error) {
    console.error(error);
  }

}

main();
//# sourceMappingURL=map.js.map