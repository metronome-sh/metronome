import { Link, useLocation } from '@remix-run/react';
import { type FunctionComponent } from 'react';

import { cn } from '#app/components';

import { type DocumentSection } from '../../types';
import { SheetCloseContainer } from './SheetCloseContainer';
import { SidebarItem } from './SidebarItem';

export type SidebarSectionProps = {
  className?: string;
  section: DocumentSection;
};

export const SidebarSection: FunctionComponent<SidebarSectionProps> = ({ section }) => {
  const { label, filename, items = [], path } = section;
  const { pathname } = useLocation();

  const fullPath = path ? `/docs/${path}.mdoc` : '/docs';

  const isActive = pathname === fullPath;

  return (
    <div>
      {filename ? (
        <SheetCloseContainer>
          <Link prefetch="intent" to={fullPath}>
            <span
              className={cn(
                'hover:text-primary-600 text-md font-semibold uppercase tracking-wider md:text-[0.70rem] hover:underline',
                isActive ? 'text-teal-500' : '',
              )}
            >
              {label}
            </span>
          </Link>
        </SheetCloseContainer>
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
