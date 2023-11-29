import { type FunctionComponent } from 'react';

import { useDocsLoaderData } from '../../hooks/useDocsLoaderData';
import { SidebarSection } from './SidebarSection';

export const Sidebar: FunctionComponent = () => {
  const { sections } = useDocsLoaderData();

  return (
    <>
      {sections.map((section) => (
        <SidebarSection key={section.label} section={section} />
      ))}
    </>
  );
};
