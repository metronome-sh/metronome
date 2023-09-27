import { FunctionComponent } from 'react';

import { cn } from '#/utils.ts';

export const Sun: FunctionComponent<{
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
      <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
      <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7"></path>
    </svg>
  );
};

{
  /* <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-sun" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.75" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
   <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7"></path>
</svg> */
}

// <svg
// xmlns="http://www.w3.org/2000/svg"
// className={cn('h-4 w-4', className)}
// width="32"
// height="32"
// viewBox="0 0 24 24"
// strokeWidth={strokeWidth}
// stroke="currentColor"
// fill="none"
// strokeLinecap="round"
// strokeLinejoin="round"
// shapeRendering="geometricPrecision"
// >
// <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
// <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z"></path>
// <path d="M12 8v4"></path>
// <path d="M12 16h.01"></path>
// </svg>
