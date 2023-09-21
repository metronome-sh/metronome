import { Decorator } from '@storybook/react';
import { dirname, join } from 'path';

// function getAbsolutePath(value: any) {
//   return dirname(require.resolve(join(value, 'package.json')));
// }

export function mockUseFetcher(data: any): Decorator {
  return (Story) => {
    return (<Story />) as ReturnType<Decorator>;
  };
}
