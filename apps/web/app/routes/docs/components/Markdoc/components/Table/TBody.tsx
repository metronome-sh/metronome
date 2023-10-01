import { FunctionComponent, PropsWithChildren } from 'react';

export const TBody: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <tbody className="divide-y divide-muted">{children}</tbody>;
};
