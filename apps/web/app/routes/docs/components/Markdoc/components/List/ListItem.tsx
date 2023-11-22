import { FunctionComponent, PropsWithChildren } from 'react';

export type ListItemProps = PropsWithChildren;

export const ListItem: FunctionComponent<ListItemProps> = ({ children }) => {
  return (
    <li className="text-muted-foreground">
      <span>{children}</span>
    </li>
  );
};
