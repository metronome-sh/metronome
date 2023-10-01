import { Link, useLocation } from '@remix-run/react';
import clsx from 'clsx';
import { type FunctionComponent } from 'react';

import { type DocumentSection } from '../../types';
import { SidebarItem } from './SidebarItem';

export type SidebarSectionProps = {
  className?: string;
  section: DocumentSection;
};

export const SidebarSection: FunctionComponent<SidebarSectionProps> = ({
  section,
}) => {
  const { label, filename, items = [], path } = section;
  const { pathname } = useLocation();

  const fullPath = path ? `/docs/${path}` : '/docs';

  const isActive = pathname === fullPath;

  return (
    <div>
      {filename ? (
        <Link prefetch="intent" to={fullPath}>
          <span
            className={clsx(
              'hover:text-primary-600 text-md font-semibold uppercase tracking-wider md:text-[0.70rem] hover:underline',
              isActive ? 'text-teal-500' : '',
            )}
          >
            {label}
          </span>
        </Link>
      ) : (
        <span className="text-md font-semibold uppercase tracking-wider md:text-[0.70rem] text-muted-foreground/70">
          {label}
        </span>
      )}
      <div className="my-3 space-y-2 pl-4 md:space-y-1">
        {items.map((item) => (
          <SidebarItem key={item.label} item={item} parentPath={path} />
        ))}
      </div>
    </div>
  );
};
