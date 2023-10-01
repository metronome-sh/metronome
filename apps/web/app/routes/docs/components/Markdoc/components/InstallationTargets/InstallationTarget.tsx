import { Link } from '@remix-run/react';
import clsx from 'clsx';
import { FunctionComponent } from 'react';

export type InstallationTargetProps = {
  title: string;
  description: string;
  className?: string;
  to: string;
};

export const InstallationTarget: FunctionComponent<InstallationTargetProps> = ({
  title,
  description,
  className,
  to,
}) => {
  return (
    <li
      className={clsx(
        className,
        'min-h-30 group relative flex items-center rounded-lg border px-5 py-4 bg-background hover:bg-muted',
      )}
    >
      <Link className="absolute inset-0" to={to} prefetch="intent">
        <span className="sr-only">Go to {title}</span>
      </Link>
      <div>
        <span className="flex items-center space-x-2 text-lg font-medium tracking-wide">
          {title}
        </span>
        <span className="font-light">{description}</span>
      </div>
    </li>
  );
};
