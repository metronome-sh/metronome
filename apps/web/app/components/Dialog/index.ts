import {
  Dialog as DialogComponent,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './Dialog';

export const Dialog = Object.assign(DialogComponent, {
  Content: DialogContent,
  Description: DialogDescription,
  Header: DialogHeader,
  Title: DialogTitle,
  Trigger: DialogTrigger,
});
