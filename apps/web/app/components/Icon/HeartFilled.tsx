import { FunctionComponent } from 'react';

import { Svg, SvgProps } from './Svg.tsx';

export const HeartFilled: FunctionComponent<SvgProps> = (props) => {
  return (
    <Svg {...props}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z"
        strokeWidth="0"
        fill="currentColor"
      />
    </Svg>
  );
};
