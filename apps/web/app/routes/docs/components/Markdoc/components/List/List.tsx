import { FunctionComponent, PropsWithChildren } from 'react';

export type ListProps = PropsWithChildren<{
  ordered?: boolean;
}>;

export const List: FunctionComponent<ListProps> = ({ children, ordered }) => {
  return ordered ? (
    <ol className="list-inside list-decimal">{children}</ol>
  ) : (
    <ul className="list-inside list-disc">{children}</ul>
  );
};
