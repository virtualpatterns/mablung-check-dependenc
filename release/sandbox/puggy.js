import { createRequire as CreateRequire } from 'module';

import { Pug } from '../library/special/pug.js';

const Require = CreateRequire(import.meta.url);

async function main() {

  try {
    console.dir(await Pug(Require.resolve('./puggy.pug')));
  } catch (error) {
    console.error(error);
  }

}

main();
//# sourceMappingURL=puggy.js.map