import { FunctionComponent, PropsWithChildren } from 'react';

import { Sheet } from '#app/components';

import { useSidebarContext } from './provider';

export const SheetCloseContainer: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { inSheet } = useSidebarContext();

  if (!inSheet) {
    return <>{children}</>;
  }

  return <Sheet.Close asChild>{children}</Sheet.Close>;
};
