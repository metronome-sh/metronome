import { FunctionComponent, PropsWithChildren } from 'react';

export type ThProps = PropsWithChildren<{
  width?: number;
}>;

export const Th: FunctionComponent<ThProps> = ({ children }) => {
  return (
    <th className="px-4 py-1 text-left">
      <span className="text-xs font-semibold uppercase tracking-wider">
        {children}
      </span>
    </th>
  );
};
