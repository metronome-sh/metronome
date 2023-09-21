import { action } from '@storybook/addon-actions';

export function useSubmit() {
  return (data) => {
    action('submit')(data);
  };
}
