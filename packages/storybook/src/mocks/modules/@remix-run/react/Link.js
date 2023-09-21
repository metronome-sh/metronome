import { action } from '@storybook/addon-actions';
import { Link as RemixLink } from '@remix-run/react';

export const Link = ({ to, ...props }) => {
  return (
    <RemixLink
      to={to}
      {...props}
      onClick={(e) => {
        action('navigate')(to);
      }}
    />
  );
};
