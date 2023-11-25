import { BreadcrumbOutlet } from './BreadcrumbOutlet';
import { Breadcrumb as BreadcrumbComponent } from './Breadcrumb';

export const Breadcrumb = Object.assign(BreadcrumbComponent, { Outlet: BreadcrumbOutlet });
