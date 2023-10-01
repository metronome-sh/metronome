import { Link as RemixLink } from '@remix-run/react';
import clsx from 'clsx';
import { FunctionComponent, PropsWithChildren } from 'react';

export type LinkProps = PropsWithChildren<{
  href: string;
  title?: string;
}>;

export const Link: FunctionComponent<LinkProps> = ({
  href,
  title,
  children,
}) => {
  const isExternal = href.startsWith('http');

  // If is external link, use a regular anchor tag
  return isExternal ? (
    <a
      className={clsx('text-primary-600 font-normal hover:underline')}
      href={href}
      title={title}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ) : (
    <RemixLink
      className={clsx('text-primary-600 font-normal hover:underline')}
      to={href}
      prefetch="intent"
    >
      {children}
    </RemixLink>
  );
};
