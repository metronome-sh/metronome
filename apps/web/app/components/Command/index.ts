import {
  Command as CommandComponent,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from './Command';

export const Command: typeof CommandComponent & {
  Dialog: typeof CommandDialog;
  Empty: typeof CommandEmpty;
  Group: typeof CommandGroup;
  Input: typeof CommandInput;
  Item: typeof CommandItem;
  List: typeof CommandList;
  Separator: typeof CommandSeparator;
  Shortcut: typeof CommandShortcut;
} = Object.assign(CommandComponent, {
  Dialog: CommandDialog,
  Empty: CommandEmpty,
  Group: CommandGroup,
  Input: CommandInput,
  Item: CommandItem,
  List: CommandList,
  Separator: CommandSeparator,
  Shortcut: CommandShortcut,
});
