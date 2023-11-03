import fs from 'fs';
import path from 'path';

// When we change to vite this will be easier to deal with.
// Read the package.json file and where imports.#app/* points to
const packageJson = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf-8'),
);

export const DOCUMENTS_PATH = packageJson.imports['#app/*'].replace(
  '*',
  '/routes/docs/documents',
);
