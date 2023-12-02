import { createContext, useContext } from 'react';
import { invariant } from 'ts-invariant';

export const sidebarContext = createContext<{ inSheet: boolean }>({ inSheet: false });

export const SidebarProvider = sidebarContext.Provider;

export const useSidebarContext = () => {
  const context = useContext(sidebarContext);
  invariant(context, 'useSidebarContext must be used within a SidebarProvider');
  return context;
};
