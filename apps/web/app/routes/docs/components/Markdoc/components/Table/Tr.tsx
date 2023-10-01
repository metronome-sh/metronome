import { FunctionComponent, PropsWithChildren } from 'react';

export const Tr: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <tr>{children}</tr>;
};
