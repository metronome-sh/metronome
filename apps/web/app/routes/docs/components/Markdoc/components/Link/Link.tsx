import { Link as RemixLink } from '@remix-run/react';
import { FunctionComponent, PropsWithChildren } from 'react';

import { cn } from '#app/components';

export type LinkProps = PropsWithChildren<{
  href: string;
  title?: string;
  className?: string;
}>;

export const Link: FunctionComponent<LinkProps> = ({
  href,
  title,
  children,
  className,
}) => {
  const isExternal = href.startsWith('http');

  console.log({ children });

  // prettier-ignore
  const classNames = cn('w-fit text-emerald-600 font-normal underline decoration-emerald-600/50 hover:decoration-emerald-600 [&>*]:underline [&>*]:decoration-emerald-600/50 [&>*]:hover:decoration-emerald-600', className)

  // If is external link, use a regular anchor tag
  return isExternal ? (
    <a
      className={classNames}
      href={href}
      title={title}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ) : (
    <RemixLink className={classNames} to={href} prefetch="intent">
      {children}
    </RemixLink>
  );
};
