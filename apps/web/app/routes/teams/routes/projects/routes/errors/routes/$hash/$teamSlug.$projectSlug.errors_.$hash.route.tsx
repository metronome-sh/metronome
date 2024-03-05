import { Breadcrumb, Heading, NotificationsOutlet } from '#app/components';
import { useParams } from '@remix-run/react';

export default function Hash() {
  const { hash } = useParams();

  return (
    <div className="w-full flex-grow flex flex-col">
      <Breadcrumb link="../errors">Errors</Breadcrumb>
      <Breadcrumb>{hash}</Breadcrumb>
      Hash
    </div>
  );
}
