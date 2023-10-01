import clsx from 'clsx';
import { type FunctionComponent, type PropsWithChildren } from 'react';

export type ParagraphProps = PropsWithChildren<{
  className?: string;
}>;

export const Paragraph: FunctionComponent<ParagraphProps> = ({
  children,
  className,
}) => {
  return (
    <span className={clsx(className, 'inline-block py-2 tracking-tight')}>
      {children}
    </span>
  );
};
