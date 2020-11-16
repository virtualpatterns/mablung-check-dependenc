import { createRequire as CreateRequire } from 'module';
import Test from 'ava';

import { Pug } from '../../../library/parser/pug.js';

const Require = CreateRequire(import.meta.url);

// empty package dependency
Test('Pug(\'filter-and-filter-include.pug\'), [])', async test => {
  test.deepEqual(await Pug(Require.resolve('./resource/pug/filter-and-filter-include.pug'), []), ['coffee-script', 'markdown-it']);
});

Test('Pug(\'filter-include.pug\'), [])', async test => {
  test.deepEqual(await Pug(Require.resolve('./resource/pug/filter-include.pug'), []), ['markdown-it']);
});

Test('Pug(\'filter.pug\'), [])', async test => {
  test.deepEqual(await Pug(Require.resolve('./resource/pug/filter.pug'), []), ['markdown-it']);
});

Test('Pug(\'no-filter.pug\'), [])', async test => {
  test.deepEqual(await Pug(Require.resolve('./resource/pug/no-filter.pug'), []), []);
});

// rename package dependency
Test('Pug(\'filter-and-filter-include.pug\'), [ \'jstransformer-coffee-script\' ,\'jstransformer-markdown-it\' ])', async test => {
  test.deepEqual(await Pug(Require.resolve('./resource/pug/filter-and-filter-include.pug'), ['jstransformer-coffee-script', 'jstransformer-markdown-it']), ['jstransformer-coffee-script', 'jstransformer-markdown-it']);
});

Test('Pug(\'filter-include.pug\'), [ \'jstransformer-markdown-it\' ])', async test => {
  test.deepEqual(await Pug(Require.resolve('./resource/pug/filter-include.pug'), ['jstransformer-markdown-it']), ['jstransformer-markdown-it']);
});

Test('Pug(\'filter.pug\'), [ \'jstransformer-markdown-it\' ])', async test => {
  test.deepEqual(await Pug(Require.resolve('./resource/pug/filter.pug'), ['jstransformer-markdown-it']), ['jstransformer-markdown-it']);
});

Test('Pug(\'no-filter.pug\'), [ \'jstransformer-markdown-it\' ])', async test => {
  test.deepEqual(await Pug(Require.resolve('./resource/pug/no-filter.pug'), ['jstransformer-markdown-it']), []);
});

// same name package dependency
Test('Pug(\'filter-and-filter-include.pug\'), [ \'coffee-script\', \'markdown-it\' ])', async test => {
  test.deepEqual(await Pug(Require.resolve('./resource/pug/filter-and-filter-include.pug'), ['coffee-script', 'markdown-it']), ['coffee-script', 'markdown-it']);
});

Test('Pug(\'filter-include.pug\'), [ \'markdown-it\' ])', async test => {
  test.deepEqual(await Pug(Require.resolve('./resource/pug/filter-include.pug'), ['markdown-it']), ['markdown-it']);
});

Test('Pug(\'filter.pug\'), [ \'markdown-it\' ])', async test => {
  test.deepEqual(await Pug(Require.resolve('./resource/pug/filter.pug'), ['markdown-it']), ['markdown-it']);
});

Test('Pug(\'no-filter.pug\'), [ \'markdown-it\' ])', async test => {
  test.deepEqual(await Pug(Require.resolve('./resource/pug/no-filter.pug'), ['markdown-it']), []);
});
//# sourceMappingURL=pug.test.js.map