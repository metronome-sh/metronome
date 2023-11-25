import { useState, useEffect, FunctionComponent, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from '@remix-run/react';
import { Icon } from '..';

type BreadcrumbProps = PropsWithChildren<{
  breadcrumbOutletId?: string;
  link?: string;
}>;

export const Breadcrumb: FunctionComponent<BreadcrumbProps> = ({
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
      <Icon.ChevronRight strokeWidth={2} className="stroke-muted-foreground" />
      {link ? <Link to={link}>{children}</Link> : <>{children}</>}
    </li>,
    breadcrumbOutlet,
  );
};
