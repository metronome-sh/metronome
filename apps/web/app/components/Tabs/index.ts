import { Tabs as Component, TabsContent, TabsList, TabsTrigger } from './Tabs';

export const Tabs: typeof Component & {
  Content: typeof TabsContent;
  List: typeof TabsList;
  Trigger: typeof TabsTrigger;
} = Object.assign(Component, {
  Content: TabsContent,
  List: TabsList,
  Trigger: TabsTrigger,
});
