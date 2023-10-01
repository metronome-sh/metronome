import { FunctionComponent, PropsWithChildren } from 'react';

export type ListItem = PropsWithChildren;

export const ListItem: FunctionComponent<ListItem> = ({ children }) => {
  return (
    <li className="text-slate-400 dark:text-slate-600">
      <span>{children}</span>
    </li>
  );
};
