import type { TPhoto } from '@shared/types/image.type';

import { Photo } from '../components/photo.component';

interface GalleryInterfaceProps {
  images: TPhoto[];
}

export function GalleryInterface({ images }: GalleryInterfaceProps) {
  return (
    <section aria-label="Gallery" className="mx-auto min-h-full max-w-7xl p-4">
      <div className="grid grid-cols-gallery gap-4">
        {images.length > 0 ? (
          images.map((image, index) => {
            return (
              <Photo
                key={image.imageId}
                image={image}
                priority={index < 9 ? true : false}
              />
            );
          })
        ) : (
          <div className="flex justify-center">
            <p className="text-center text-lg font-medium text-zinc-300 md:text-xl">
              Your image gallery is empty
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
