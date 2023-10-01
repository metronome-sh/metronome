import { FunctionComponent, PropsWithChildren } from 'react';

export type StrongProps = PropsWithChildren;

export const Strong: FunctionComponent<StrongProps> = ({ children }) => {
  return <span className="font-medium tracking-wide">{children}</span>;
};
