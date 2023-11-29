import {
  Sheet as SheetComponent,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './Sheet';

export const Sheet: typeof SheetComponent & {
  Content: typeof SheetContent;
  Description: typeof SheetDescription;
  Header: typeof SheetHeader;
  Title: typeof SheetTitle;
  Trigger: typeof SheetTrigger;
} = Object.assign(SheetComponent, {
  Content: SheetContent,
  Description: SheetDescription,
  Header: SheetHeader,
  Title: SheetTitle,
  Trigger: SheetTrigger,
});
