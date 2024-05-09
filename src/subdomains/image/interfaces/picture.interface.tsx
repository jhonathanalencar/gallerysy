import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

import type { TPhoto } from '@shared/types/image.type';

interface PictureInterfaceProps {
  image: TPhoto;
}

export function PictureInterface({ image }: PictureInterfaceProps) {
  return (
    <section>
      <div className="absolute left-0 top-20 h-full w-full">
        <Image
          src={image.blurredDataUrl || image.imageUrl}
          alt="blurred background"
          sizes="100vw"
          fill
          className={twMerge(
            'pointer-events-none h-full w-full',
            image.blurredDataUrl ? '' : 'blur-3xl'
          )}
        />
      </div>
      <div className="absolute left-0 top-20 flex aspect-[3/2] h-full w-full items-center justify-center">
        <div className="relative aspect-[3/2] w-full max-w-7xl">
          <Image
            src={image.imageUrl}
            alt={image.name}
            sizes="100vw"
            fill
            priority
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}
