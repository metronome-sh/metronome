import { FunctionComponent, SVGProps } from 'react';

import { cn } from '../utils';

export type SvgProps = SVGProps<SVGSVGElement>;

export const Svg: FunctionComponent<SvgProps> = ({
  children,
  className,
  strokeWidth = 1.75,
  ...props
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
      {...props}
    >
      {children}
    </svg>
  );
};
