import {
  Sheet as SheetComponent,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
  SheetOverlay,
  SheetPortal,
} from './Sheet';

export const Sheet: typeof SheetComponent & {
  Content: typeof SheetContent;
  Description: typeof SheetDescription;
  Header: typeof SheetHeader;
  Title: typeof SheetTitle;
  Trigger: typeof SheetTrigger;
  Close: typeof SheetClose;
  Footer: typeof SheetFooter;
  Overlay: typeof SheetOverlay;
  Portal: typeof SheetPortal;
} = Object.assign(SheetComponent, {
  Content: SheetContent,
  Description: SheetDescription,
  Header: SheetHeader,
  Title: SheetTitle,
  Trigger: SheetTrigger,
  Close: SheetClose,
  Footer: SheetFooter,
  Overlay: SheetOverlay,
  Portal: SheetPortal,
});
