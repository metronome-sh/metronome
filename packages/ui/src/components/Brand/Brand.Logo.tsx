import { Link } from '@remix-run/react';
import { type FunctionComponent } from 'react';

import { cn } from '#/utils.ts';

export type BrandLogoProps = {
  className?: string;
  noLink?: boolean;
};

const Svg: FunctionComponent<{ className?: string }> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1027 1027"
      preserveAspectRatio="xMinYMin meet"
      shapeRendering="geometricPrecision"
      className={className}
      fill="none"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="60"
        d="m629.698 323-22.499-75.845c-15.469-45.54-160.592-45.54-176.061 0L255.983 742.092C244.451 776.042 267.788 812 301.355 812h407.29c33.567 0 56.904-35.958 45.372-69.908L684.724 508.5"
      />
      <path stroke="currentColor" strokeWidth="60" d="M731 656H288" />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="60"
        d="m500.295 656.058 232.181-355.353"
      />
    </svg>
  );
};

export const BrandLogo: FunctionComponent<BrandLogoProps> = ({
  className,
  noLink,
}) => {
  const imgMarkup = (
    <Svg
      className={cn(
        'h-10 text-zinc-900 dark:text-zinc-50 transition-colors duration-300',
        className,
      )}
    />
  );

  return noLink ? imgMarkup : <Link to="/">{imgMarkup as any}</Link>;
};

BrandLogo.displayName = 'Brand.Logo';
