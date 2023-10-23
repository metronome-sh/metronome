import { FunctionComponent, PropsWithChildren } from 'react';

export const THead: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <thead className="bg-muted/50">{children}</thead>;
};
