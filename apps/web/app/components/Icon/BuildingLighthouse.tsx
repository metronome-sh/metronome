import { FunctionComponent } from 'react';

import { cn } from '../utils.ts';

export const BuildingLighthouse: FunctionComponent<{
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
      <path d="M12 3l2 3l2 15h-8l2 -15z"></path>
      <path d="M8 9l8 0"></path>
      <path d="M3 11l2 -2l-2 -2"></path>
      <path d="M21 11l-2 -2l2 -2"></path>
    </svg>
  );
};
