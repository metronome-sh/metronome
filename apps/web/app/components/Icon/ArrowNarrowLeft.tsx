import { FunctionComponent } from 'react';

import { Svg, SvgProps } from './Svg.tsx';

export const ArrowNarrowLeft: FunctionComponent<SvgProps> = (props) => {
  return (
    <Svg {...props}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M5 12l14 0"></path>
      <path d="M5 12l4 4"></path>
      <path d="M5 12l4 -4"></path>
    </Svg>
  );
};
