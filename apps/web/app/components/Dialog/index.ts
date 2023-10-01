import {
  Dialog as DialogComponent,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './Dialog';

export const Dialog: typeof DialogComponent & {
  Content: typeof DialogContent;
  Description: typeof DialogDescription;
  Footer: typeof DialogFooter;
  Header: typeof DialogHeader;
  Title: typeof DialogTitle;
  Trigger: typeof DialogTrigger;
} = Object.assign(DialogComponent, {
  Content: DialogContent,
  Description: DialogDescription,
  Header: DialogHeader,
  Title: DialogTitle,
  Trigger: DialogTrigger,
  Footer: DialogFooter,
});
