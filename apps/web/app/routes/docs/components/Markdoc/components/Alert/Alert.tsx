import { FunctionComponent, PropsWithChildren } from 'react';

import { Alert as AlertPrimitive, Icon } from '#app/components';

type AlertProps = PropsWithChildren<{
  title?: string;
}>;

export const Alert: FunctionComponent<AlertProps> = ({ children, title }) => {
  return (
    <AlertPrimitive className="my-4">
      <Icon.InfoSquareRounded className="opacity-40" />
      {title ? (
        <AlertPrimitive.Title className="text-base">
          {title}
        </AlertPrimitive.Title>
      ) : null}
      <AlertPrimitive.Description>{children}</AlertPrimitive.Description>
    </AlertPrimitive>
  );
};
