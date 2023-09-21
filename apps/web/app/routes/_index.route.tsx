import type { MetaFunction } from '@remix-run/node';
import AuthenticationGrantComponent from './authentication/authentication.grant.route';
export const meta: MetaFunction = () => {
  return [
    { title: 'Metronome' },
    { name: 'description', content: 'Remix Analytics' },
  ];
};

export default AuthenticationGrantComponent;
