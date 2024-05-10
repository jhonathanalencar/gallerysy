import { forwardRef } from 'react';
import Image, { type ImageProps } from 'next/image';
import Link from 'next/link';

import type { TPhoto } from '@shared/types/image.type';

interface PhotoProps extends Omit<ImageProps, 'src' | 'alt'> {
  image: TPhoto;
}

export const Photo = forwardRef<HTMLAnchorElement, PhotoProps>(
  ({ image, ...rest }, ref) => {
    return (
      <Link
        ref={ref}
        href={`/img/${image.imageId}`}
        className="group relative aspect-video w-full cursor-zoom-in overflow-hidden rounded bg-zinc-800 shadow-md"
      >
        <Image
          src={image.imageUrl}
          alt={image.name}
          placeholder={image.blurredDataUrl ? 'blur' : 'empty'}
          blurDataURL={image.blurredDataUrl}
          sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
          fill
          className="h-full w-full object-contain group-hover:brightness-110"
          {...rest}
        />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/75 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
          <span className="block truncate pb-1 pl-2 font-medium text-zinc-100">
            {image.name}
          </span>
        </div>
      </Link>
    );
  }
);
Photo.displayName = 'Photo';
