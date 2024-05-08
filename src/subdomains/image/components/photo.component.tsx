import Image, { type ImageProps } from 'next/image';

import type { TPhoto } from '@shared/types/image.type';

interface PhotoProps extends Omit<ImageProps, 'src' | 'alt'> {
  image: TPhoto;
}

export function Photo({ image, ...rest }: PhotoProps) {
  return (
    <div className="group relative aspect-video w-full overflow-hidden rounded bg-zinc-800 shadow-md">
      <Image
        src={image.imageUrl}
        alt={image.name}
        placeholder="blur"
        blurDataURL={image.blurredDataUrl}
        sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
        fill
        priority={image.imageId <= 9 ? true : false}
        className="h-full w-full object-contain group-hover:brightness-110"
        {...rest}
      />
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/75 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
        <span className="block truncate pb-1 pl-2 font-medium text-zinc-100">
          {image.name}
        </span>
      </div>
    </div>
  );
}