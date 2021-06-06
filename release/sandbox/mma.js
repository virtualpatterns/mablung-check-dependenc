import { createRequire as CreateRequire } from 'module';
import FileSystem from 'fs-extra';
import Parse from '@kba/makefile-parser';

const Require = CreateRequire(import.meta.url);

async function main() {

  try {

    // console.log(Require.resolve('./makefile'))
    // console.log(await FileSystem.readFile(Require.resolve('./makefile'), { 'encoding': 'utf-8' }))

    const { ast } = Parse(await FileSystem.readFile(Require.resolve('./makefile'), { 'encoding': 'utf-8' }));
    console.log(ast);

  } catch (error) {
    console.error(error);
  }

}

main();

//# sourceMappingURL=mma.js.map