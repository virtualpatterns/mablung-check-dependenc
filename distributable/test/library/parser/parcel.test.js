import Test from 'ava';

import { Parcel } from '../../../library/parser/parcel.js';

Test('Parcel(\'package.json\', [])', async test => {
  test.deepEqual(await Parcel('package.json', []), []);
});

Test('Parcel(\'package.json\', [ \'ava\' ])', async test => {
  test.deepEqual(await Parcel('package.json', ['ava']), []);
});

Test('Parcel(\'package.json\', [ \'@virtualpatterns/parcel-plugin-virtual-pug\', \'ava\' ])', async test => {
  test.deepEqual(await Parcel('package.json', ['@virtualpatterns/parcel-plugin-virtual-pug', 'ava']), []);
});

Test('Parcel(\'package.json\', [ \'@virtualpatterns/parcel-plugin-virtual-pug\', \'ava\', \'parcel-bundler\' ])', async test => {
  test.deepEqual(await Parcel('package.json', ['@virtualpatterns/parcel-plugin-virtual-pug', 'ava', 'parcel-bundler']), ['@virtualpatterns/parcel-plugin-virtual-pug']);
});
//# sourceMappingURL=parcel.test.js.map