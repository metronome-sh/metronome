import { action } from '@storybook/addon-actions';

export function useNavigate() {
  return (data) => {
    action('navigate')(data);
  };
}
