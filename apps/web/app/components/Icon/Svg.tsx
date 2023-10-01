import { FunctionComponent, PropsWithChildren } from 'react';

import { cn } from '../utils';

export type SvgProps = {
  className?: string;
  strokeWidth?: number;
};

export const Svg: FunctionComponent<PropsWithChildren<SvgProps>> = ({
  children,
  className,
  strokeWidth,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-4 w-4 inline-block', className)}
      width="32"
      height="32"
      viewBox="0 0 24 24"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      shapeRendering="geometricPrecision"
    >
      {children}
    </svg>
  );
};
