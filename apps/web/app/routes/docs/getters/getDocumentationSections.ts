import { parse, Tokenizer } from '@markdoc/markdoc';
import { env } from '@metronome/env.server';
import fs from 'fs/promises';
import yaml from 'js-yaml';
import path from 'path';

import { DOCUMENTS_PATH } from '../constants';
import { type DocumentSections } from '../types';

let documentSections: DocumentSections = [];

export async function getDocumentationSections(): Promise<DocumentSections> {
  if (env.production && documentSections.length > 0) return documentSections;

  const source = await fs.readFile(
    path.resolve(DOCUMENTS_PATH, 'index.mdoc'),
    'utf-8',
  );

  const tokenizer = new Tokenizer({ allowComments: true });

  const tokens = tokenizer.tokenize(source);

  const ast = parse(tokens);

  const documentMeta = (
    ast.attributes.frontmatter ? yaml.load(ast.attributes.frontmatter) : {}
  ) as Record<string, string> & { sections?: DocumentSections };

  const { sections = [] } = documentMeta;

  documentSections = sections;

  return sections;
}
