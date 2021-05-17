import BaseCheck from 'depcheck';
import Path from 'path';
import URL from 'url';

const FilePath = URL.fileURLToPath(import.meta.url);
// const FolderPath = Path.dirname(FilePath)

async function main() {

  try {

    console.dir(await BaseCheck.parser.es7.default(FilePath));

  } catch (error) {
    console.error(error);
  }

}

main();

//# sourceMappingURL=content.js.map