import { Alert as AlertComponent, AlertDescription, AlertTitle } from './Alert';

export const Alert = Object.assign(AlertComponent, {
  Title: AlertTitle,
  Description: AlertDescription,
});
