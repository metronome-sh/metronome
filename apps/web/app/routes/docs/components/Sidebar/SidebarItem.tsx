import { Link, useLocation } from '@remix-run/react';
import clsx from 'clsx';
import { type FunctionComponent } from 'react';

import { type DocumentSectionItem } from '../../types';

export type SidebarItemProps = {
  parentPath: string;
  item: DocumentSectionItem;
};

export const SidebarItem: FunctionComponent<SidebarItemProps> = ({
  item,
  parentPath,
}) => {
  const { label, path } = item;

  const { pathname } = useLocation();

  const fullPath = path ? `/docs/${parentPath}/${path}.mdoc` : '/docs';

  const isActive = pathname === fullPath;

  return (
    <div>
      <Link prefetch="intent" to={fullPath}>
        <span
          className={clsx(
            'hover:text-primary-6000 tracking-wide hover:underline text-sm',
            isActive ? 'text-teal-500' : 'text-foreground',
          )}
        >
          {label}
        </span>
      </Link>
    </div>
  );
};
