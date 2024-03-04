import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export const getDocumentsPath = () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // When we change to vite this will be easier to deal with.
  // Read the package.json file and where imports.#app/* points to
  const packageJson = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../../../package.json'), 'utf-8'),
  );
  return packageJson.imports['#app/*'].replace('*', '/routes/docs/documents');
};
