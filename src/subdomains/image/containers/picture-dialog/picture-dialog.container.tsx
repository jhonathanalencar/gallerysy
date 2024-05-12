import { Suspense } from 'react';

import { PictureDialogContainerSkeleton } from './picture-dialog-skeleton.container';
import { PictureDialogContainerLoader } from './picture-dialog-loader.container';

interface PictureDialogContainerProps {
  imageId: string;
}

export function PictureDialogContainer({
  imageId,
}: PictureDialogContainerProps) {
  return (
    <Suspense fallback={<PictureDialogContainerSkeleton />}>
      <PictureDialogContainerLoader imageId={imageId} />
    </Suspense>
  );
}
