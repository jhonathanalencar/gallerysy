import { notFound } from 'next/navigation';

import { getImage } from '../../queries';
import { CustomError } from '@shared/errors/custom-error.error';

import { PictureInterface } from '../../interfaces/picture.interface';
import { ErrorMessage } from '@shared/components/error-message.component';

interface PictureContainerLoaderProps {
  imageId: string;
}

export async function PictureContainerLoader({
  imageId,
}: PictureContainerLoaderProps) {
  try {
    const imageIdAsNumber = parseInt(imageId);
    if (Number.isNaN(imageIdAsNumber)) throw new Error('invalid picture id');

    const image = await getImage(imageIdAsNumber);

    if (!image) notFound();

    return <PictureInterface image={image} />;
  } catch (error) {
    if (error instanceof CustomError) {
      return <ErrorMessage>{error.message}</ErrorMessage>;
    }
    return <ErrorMessage />;
  }
}
