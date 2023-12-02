import { Breadcrumb as BreadcrumbComponent } from './Breadcrumb';
import { BreadcrumbOutlet } from './BreadcrumbOutlet';

export const Breadcrumb = Object.assign(BreadcrumbComponent, { Outlet: BreadcrumbOutlet });
