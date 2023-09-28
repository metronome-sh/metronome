import { FunctionComponent } from 'react';

import { cn } from '../utils.ts';

export const TimelineEventExclamation: FunctionComponent<{
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
      <path d="M12 20m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
      <path d="M10 20h-6"></path>
      <path d="M14 20h6"></path>
      <path d="M12 15l-2 -2h-3a1 1 0 0 1 -1 -1v-8a1 1 0 0 1 1 -1h10a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-3l-2 2z"></path>
      <path d="M12 6v2"></path>
      <path d="M12 11v.01"></path>
    </svg>
  );
};
