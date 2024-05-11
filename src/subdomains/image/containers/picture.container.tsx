import { notFound } from 'next/navigation';

import { getImage } from '../queries';

import { AppLayout } from '@shared/layouts/app.layout';
import { PictureInterface } from '../interfaces/picture.interface';

interface PictureContainerProps {
  imageId: string;
}

export async function PictureContainer({ imageId }: PictureContainerProps) {
  const imageIdAsNumber = parseInt(imageId);
  if (Number.isNaN(imageIdAsNumber)) throw new Error('invalid picture id');

  const image = await getImage(imageIdAsNumber);

  if (!image) notFound();

  return (
    <AppLayout>
      <PictureInterface image={image} />
    </AppLayout>
  );
}
