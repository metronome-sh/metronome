import { FunctionComponent } from 'react';

import { cn } from '../utils.ts';

export const Heartbeat: FunctionComponent<{
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
      <path d="M19.5 13.572l-7.5 7.428l-2.896 -2.868m-6.117 -8.104a5 5 0 0 1 9.013 -3.022a5 5 0 1 1 7.5 6.572"></path>
      <path d="M3 13h2l2 3l2 -6l1 3h3"></path>
    </svg>
  );
};
