import { action } from '@storybook/addon-actions';
import { FunctionComponent } from 'react';
import {
  Link as RemixLink,
  LinkProps,
} from '../../../../../node_modules/@remix-run/react';
import React from 'react';

export const Link: FunctionComponent<LinkProps> = ({ to, ...props }) => {
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
