import { Link, useLocation } from '@remix-run/react';
import { FunctionComponent, PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { cn, Icon } from '..';

type BreadcrumbProps = PropsWithChildren<{
  chevronClassName?: string;
  breadcrumbOutletId?: string;
  link?: string;
}>;

export const Breadcrumb: FunctionComponent<BreadcrumbProps> = ({
  chevronClassName,
  breadcrumbOutletId = 'default-breadcrumb',
  link,
  children,
}) => {
  const [breadcrumbOutlet, setBreadcrumbOutlet] = useState<HTMLOListElement>();

  useEffect(() => {
    const outletElement = document.getElementById(breadcrumbOutletId) as HTMLOListElement;
    if (outletElement) {
      setBreadcrumbOutlet(outletElement);
    }
  }, [breadcrumbOutletId]);

  if (!breadcrumbOutlet) return null;

  return createPortal(
    <li className="flex gap-2 items-center text-sm">
      <Icon.ChevronRight
        strokeWidth={2}
        className={cn('stroke-muted-foreground', chevronClassName)}
      />
      {link ? <Link to={link}>{children}</Link> : <>{children}</>}
    </li>,
    breadcrumbOutlet,
  );
};
