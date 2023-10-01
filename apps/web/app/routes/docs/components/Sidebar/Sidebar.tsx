import { type FunctionComponent } from 'react';

import { useDocsLoaderData } from '../../hooks/useDocsLoaderData';
import { SidebarSection } from './SidebarSection';

export const Sidebar: FunctionComponent = () => {
  const { sections } = useDocsLoaderData();

  return (
    <div className="top-15 w-75 fixed inset-0 left-0 right-auto z-20 hidden overflow-y-auto border-r px-8 pb-10 lg:block bg-background/50">
      <div className="space-y-3 pt-10">
        {sections.map((section) => (
          <SidebarSection key={section.label} section={section} />
        ))}
      </div>
    </div>
  );
};
