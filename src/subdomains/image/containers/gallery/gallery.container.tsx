import { Suspense } from 'react';

import { AppLayout } from '@shared/layouts/app.layout';
import { GalleryContainerLoader } from './gallery-loader.container';
import { GalleryContainerSkeleton } from './gallery-skeleton.container';

export function GalleryContainer() {
  return (
    <AppLayout>
      <Suspense fallback={<GalleryContainerSkeleton />}>
        <GalleryContainerLoader />
      </Suspense>
    </AppLayout>
  );
}
