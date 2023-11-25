import { FunctionComponent } from 'react';

export interface BreadcrumbOutletProps {
  id?: string;
}

export const BreadcrumbOutlet: FunctionComponent<BreadcrumbOutletProps> = ({
  id = 'default-breadcrumb',
}) => {
  return (
    <nav aria-label="breadcrumb" className="breadcrumb">
      <ol className="flex gap-2" id={id} />
    </nav>
  );
};
