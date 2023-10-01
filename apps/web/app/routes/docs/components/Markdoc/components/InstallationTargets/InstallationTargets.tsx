import clsx from 'clsx';
import { type FunctionComponent, type PropsWithChildren } from 'react';

export type InstallationTargetProps = PropsWithChildren<{
  className?: string;
}>;

export const InstallationTargets: FunctionComponent<
  InstallationTargetProps
> = ({ className, children }) => {
  return (
    <ul className={clsx(className, 'grid grid-cols-1 gap-3 md:grid-cols-2')}>
      {children}
    </ul>
  );
};
