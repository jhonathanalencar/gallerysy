import { Suspense } from 'react';

import { AppLayout } from '@shared/layouts/app.layout';
import { PictureContainerLoader } from './picture-loader.container';
import { PictureContainerSkeleton } from './picture-skeleton.container';

interface PictureContainerProps {
  imageId: string;
}

export function PictureContainer({ imageId }: PictureContainerProps) {
  return (
    <AppLayout>
      <Suspense fallback={<PictureContainerSkeleton />}>
        <PictureContainerLoader imageId={imageId} />
      </Suspense>
    </AppLayout>
  );
}
