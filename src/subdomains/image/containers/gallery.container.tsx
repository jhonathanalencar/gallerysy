import { Suspense } from 'react';

import { getImages } from '../queries';

import { AppLayout } from '@shared/layouts/app.layout';
import { GalleryInterface } from '../interfaces/gallery.interface';
import { Skeleton } from '@shared/components/skeleton.component';

async function GalleryContainerLoader() {
  const images = await getImages();

  return <GalleryInterface images={images} />;
}

function GalleryContainerSkeleton() {
  return (
    <section className="mx-auto min-h-full max-w-7xl p-4">
      <div className="grid grid-cols-gallery gap-4">
        {Array.from(Array(9).keys()).map((index) => {
          return (
            <Skeleton
              key={index}
              className="aspect-video h-full w-full rounded bg-cover shadow-md"
            />
          );
        })}
      </div>
    </section>
  );
}

export function GalleryContainer() {
  return (
    <AppLayout>
      <Suspense fallback={<GalleryContainerSkeleton />}>
        <GalleryContainerLoader />
      </Suspense>
    </AppLayout>
  );
}
