import { FunctionComponent } from 'react';

import { cn } from '../utils.ts';

export const RouteSquareTwo: FunctionComponent<{
  className?: string;
  strokeWidth?: number;
}> = ({ className, strokeWidth = 1.75 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-4 w-4', className)}
      width="32"
      height="32"
      viewBox="0 0 24 24"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M14 5a2 2 0 0 0 -2 2v10a2 2 0 0 1 -2 2"></path>
      <path d="M3 17h4v4h-4z"></path>
      <path d="M17 3h4v4h-4z"></path>
    </svg>
  );
};
