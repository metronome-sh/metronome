import { Link } from '@remix-run/react';
import { type FunctionComponent } from 'react';

import { cn } from '~/utils';

import { BrandLogo } from './Brand.Logo';
import brandWhite from './images/brand-white.svg';

export type BrandProps = {
  className?: string;
  containerClassName?: string;
  noLink?: boolean;
};

export const Brand: FunctionComponent<BrandProps> & {
  Logo: typeof BrandLogo;
} = ({ className, containerClassName, noLink }) => {
  const imgMarkup = (
    <img
      className={cn('h-7', className)}
      src={brandWhite}
      alt="Metronome logo"
    />
  );

  return (
    <div className={containerClassName}>
      {noLink ? imgMarkup : <Link to="/">{imgMarkup}</Link>}
    </div>
  );
};

Brand.Logo = BrandLogo;
