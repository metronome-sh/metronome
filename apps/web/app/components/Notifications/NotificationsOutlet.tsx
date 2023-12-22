import { FunctionComponent } from 'react';

export interface NotificationsOutletProps {
  id?: string;
}

export const NotificationsOutlet: FunctionComponent<NotificationsOutletProps> = ({
  id = 'default-notifications',
}) => {
  return (
    <div aria-label="notifications">
      <div id={id} />
    </div>
  );
};
