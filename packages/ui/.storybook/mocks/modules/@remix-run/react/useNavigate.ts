import { action } from '@storybook/addon-actions';

export function useNavigate() {
  return (data: any) => {
    action('navigate')(data);
  };
}
