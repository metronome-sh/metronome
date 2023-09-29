import {
  Avatar as AvatarComponent,
  AvatarFallback,
  AvatarImage,
} from './Avatar';

export const Avatar = Object.assign(AvatarComponent, {
  Fallback: AvatarFallback,
  Image: AvatarImage,
});
