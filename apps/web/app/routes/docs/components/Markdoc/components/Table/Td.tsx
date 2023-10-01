import clsx from 'clsx';
import { FunctionComponent, PropsWithChildren } from 'react';

export type TdProps = PropsWithChildren<{
  className?: string;
}>;

export const Td: FunctionComponent<TdProps> = ({ className, children }) => {
  const isString = typeof children === 'string';

  return (
    <td className={clsx(className, 'px-4 py-2')}>
      <span className={clsx(isString && 'font-light')}>{children}</span>
    </td>
  );
};
