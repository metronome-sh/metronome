import { Link } from '@remix-run/react';
import { type FunctionComponent } from 'react';

import { cn } from '~/utils';

import logoWhite from './images/logo-white.svg';

export type BrandLogoProps = {
  className?: string;
  noLink?: boolean;
};

export const BrandLogo: FunctionComponent<BrandLogoProps> = ({
  className,
  noLink,
}) => {
  const imgMarkup = (
    <img
      className={cn('h-10 w-10', className)}
      src={logoWhite}
      alt="Metronome logo"
    />
  );

  return noLink ? imgMarkup : <Link to="/">{imgMarkup}</Link>;
};

BrandLogo.displayName = 'Brand.Logo';
