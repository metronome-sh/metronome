import { type RenderableTreeNode } from '@markdoc/markdoc';
import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { DocsHeader, Sidebar, TableOfContents } from './components';
import { useMarkdoc } from './components/Markdoc';
import { getDocumentationSections, getDocumentMarkdocContent } from './getters';
import { type DocumentHeadings } from './types';

export async function loader({ params }: LoaderFunctionArgs) {
  const path = params['*'] || 'index';

  let content: RenderableTreeNode;
  let headings: DocumentHeadings;

  try {
    ({ content, headings } = await getDocumentMarkdocContent(`${path}.mdoc`));
  } catch (error) {
    console.log(error);
    throw new Response('Not found', { status: 404 });
  }

  const sections = await getDocumentationSections();
  return json({ sections, content, headings });
}

export default function Doc() {
  const { content } = useLoaderData<typeof loader>();

  const children = useMarkdoc(content);

  return (
    <div className="flex min-h-screen flex-col dark:black">
      <DocsHeader />
      <Sidebar />
      <div className="xl:px-90 pt-15 max-w-400 mx-auto w-full pb-10 leading-relaxed lg:pl-80">
        <div className="pt-8">
          <div className="px-3">{children}</div>
        </div>
      </div>
      <TableOfContents />
    </div>
  );
}
