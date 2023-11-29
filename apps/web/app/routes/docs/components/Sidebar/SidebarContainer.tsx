import { type FunctionComponent } from 'react';

import { Sidebar } from '.';

export const SidebarContainer: FunctionComponent = () => {
  return (
    <div className="top-15 w-75 fixed inset-0 left-0 right-auto z-20 hidden overflow-y-auto border-r px-8 pb-10 lg:block bg-background/50">
      <div className="space-y-3 pt-10">
        <Sidebar />
      </div>
    </div>
  );
};
