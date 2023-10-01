import { parse, Tokenizer } from '@markdoc/markdoc';
import fs from 'fs/promises';
import yaml from 'js-yaml';
import path from 'path';

import { DOCUMENTS_PATH } from '../constants';
import { type DocumentMeta } from '../types';

export async function getDocumentMeta(filename: string): Promise<DocumentMeta> {
  const source = await fs.readFile(
    path.resolve(DOCUMENTS_PATH, filename),
    'utf-8',
  );

  const tokenizer = new Tokenizer({ allowComments: true });

  const tokens = tokenizer.tokenize(source);

  const ast = parse(tokens);

  const documentMeta = (
    ast.attributes.frontmatter ? yaml.load(ast.attributes.frontmatter) : {}
  ) as Record<string, string>;

  return documentMeta;
}
