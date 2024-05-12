import { notFound } from 'next/navigation';

import { getImage } from '../../queries';
import { CustomError } from '@shared/errors/custom-error.error';

import { PictureDialogInterface } from '../../interfaces/picture-dialog.interface';
import { ErrorMessage } from '@shared/components/error-message.component';

interface PictureDialogContainerLoaderProps {
  imageId: string;
}

export async function PictureDialogContainerLoader({
  imageId,
}: PictureDialogContainerLoaderProps) {
  try {
    const imageIdAsNumber = parseInt(imageId);
    if (Number.isNaN(imageIdAsNumber)) throw new Error('Invalid photo id');

    const image = await getImage(imageIdAsNumber);

    if (!image) notFound();

    return <PictureDialogInterface image={image} />;
  } catch (error) {
    if (error instanceof CustomError) {
      return <ErrorMessage>{error.message}</ErrorMessage>;
    }
    return <ErrorMessage />;
  }
}
