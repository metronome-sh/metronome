import { type FunctionComponent } from 'react';

export type ImageProps = {
  src: string;
  alt: string;
  className?: string;
  byUrl?: string;
  byLabel?: string;
  fromUrl?: string;
  fromLabel?: string;
};

export const Image: FunctionComponent<ImageProps> = ({
  src,
  alt,
  className,
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
    />
  );
};
