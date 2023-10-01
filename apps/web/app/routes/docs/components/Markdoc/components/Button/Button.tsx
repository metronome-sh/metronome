import { Link } from '@remix-run/react';
import { type FunctionComponent } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ButtonProps = Pick<any, 'to' | 'color'> & {
  label: string;
  className?: string;
  // rightIcon?: keyof typeof icons;
};

export const Button: FunctionComponent<ButtonProps> = ({
  to,
  label,
  className,
}) => {
  return (
    <div className={className}>
      <Link to={to} prefetch="intent">
        {label}
      </Link>
    </div>
  );
};
