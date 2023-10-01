import { FunctionComponent, PropsWithChildren } from 'react';

export const Table: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div className="my-4 overflow-hidden border md:rounded-lg">
      <table className="min-w-full divide-y divide-muted">{children}</table>
    </div>
  );
};
