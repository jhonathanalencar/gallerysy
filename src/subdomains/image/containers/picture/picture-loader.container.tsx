import { notFound } from 'next/navigation';

import { getImage } from '../../queries';

import { PictureInterface } from '../../interfaces/picture.interface';

interface PictureContainerLoaderProps {
  imageId: string;
}

export async function PictureContainerLoader({
  imageId,
}: PictureContainerLoaderProps) {
  const imageIdAsNumber = parseInt(imageId);
  if (Number.isNaN(imageIdAsNumber)) throw new Error('invalid picture id');

  const image = await getImage(imageIdAsNumber);

  if (!image) notFound();

  return <PictureInterface image={image} />;
}
