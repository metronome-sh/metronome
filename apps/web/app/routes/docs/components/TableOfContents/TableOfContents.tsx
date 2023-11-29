import { Link } from '@remix-run/react';
import { type FunctionComponent } from 'react';

import { cn } from '#app/components/utils';

import { toSlug } from '../../helpers';
import { useDocsLoaderData } from '../../hooks/useDocsLoaderData';

export const TableOfContents: FunctionComponent = () => {
  const { headings } = useDocsLoaderData();

  return (
    <div className="top-15 w-75 fixed bottom-0 right-0 left-auto z-20 hidden overflow-y-auto border-l px-8 pb-10 xl:block">
      <ul className="space-y-2 pt-10">
        {headings
          .filter(({ level }) => level ?? 0 <= 2)
          .map((heading) => (
            <li key={heading.title}>
              <Link to={{ hash: toSlug(heading.title) }}>
                <span className={cn(heading.level === 1 ? '' : 'text-sm tracking-wide')}>
                  {heading.title}
                </span>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};
