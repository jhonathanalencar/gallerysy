import type { TPhoto } from '@shared/types/image.type';

import { Photo } from '../components/photo.component';

interface GalleryInterfaceProps {
  images: TPhoto[];
}

export function GalleryInterface({ images }: GalleryInterfaceProps) {
  return (
    <section className="mx-auto min-h-full max-w-7xl p-4">
      <div className="grid grid-cols-gallery gap-4">
        {images.map((image) => {
          return <Photo key={image.imageId} image={image} />;
        })}
      </div>
    </section>
  );
}
