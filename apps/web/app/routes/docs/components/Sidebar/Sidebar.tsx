import { type FunctionComponent } from 'react';

import { useDocsLoaderData } from '../../hooks/useDocsLoaderData';
import { SidebarSection } from './SidebarSection';
import { SidebarProvider } from './provider';

export const Sidebar: FunctionComponent<{ inSheet?: boolean }> = ({ inSheet = false }) => {
  const { sections } = useDocsLoaderData();

  return (
    <SidebarProvider value={{ inSheet }}>
      {sections.map((section) => (
        <SidebarSection key={section.label} section={section} />
      ))}
    </SidebarProvider>
  );
};
