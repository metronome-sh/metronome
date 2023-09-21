import { urlToRequest } from 'loader-utils';
import path from 'path';
import fs from 'fs';
import { ESLint } from 'eslint';
import * as unusedImports from 'eslint-plugin-unused-imports';
import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';

const cachePath = path.resolve(
  __dirname,
  '../../node_modules/.cache/remove-remix-functions-loader',
);

if (!fs.existsSync(cachePath)) {
  fs.mkdirSync(cachePath, { recursive: true });
}

const eslint = new ESLint({
  useEslintrc: false,
  fix: true,
  plugins: { 'unused-imports': unusedImports },
  overrideConfig: {
    plugins: ['unused-imports'],
    ignorePatterns: [`!.*`, `!${cachePath}/*`],
    rules: {
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
});

export default async function (source) {
  if (!urlToRequest(this.resourcePath).endsWith('route.tsx')) {
    return source;
  }

  const filename = path.basename(this.resourcePath);

  const ast = parser.parse(source, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript'],
  });

  traverse(ast, {
    enter(path) {
      if (path.isExportNamedDeclaration()) {
        path.remove();
      }
    },
  });

  const output = generate(ast);

  const cachedFilePath = path.resolve(cachePath, filename);

  fs.writeFileSync(cachedFilePath, output.code);

  const results = await eslint.lintFiles([cachedFilePath]);

  await ESLint.outputFixes(results);

  this.addDependency(cachedFilePath);

  return fs.readFileSync(cachedFilePath).toString('utf-8');
}
