import {
  Tooltip as TooltipPrimitive,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './Tooltip';

export const Tooltip = Object.assign(TooltipPrimitive, {
  Content: TooltipContent,
  Provider: TooltipProvider,
  Trigger: TooltipTrigger,
});
