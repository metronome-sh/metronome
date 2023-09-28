import { action } from '@storybook/addon-actions';

export function useSubmit() {
  return (data: any) => {
    action('submit')(data);
  };
}
