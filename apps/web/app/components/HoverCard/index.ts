import {
  HoverCard as HoverCardComponent,
  HoverCardContent,
  HoverCardTrigger,
} from './HoverCard';

export const HoverCard: typeof HoverCardComponent & {
  Content: typeof HoverCardContent;
  Trigger: typeof HoverCardTrigger;
} = Object.assign(HoverCardComponent, {
  Content: HoverCardContent,
  Trigger: HoverCardTrigger,
});
