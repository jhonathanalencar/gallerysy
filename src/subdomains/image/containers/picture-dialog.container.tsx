import { getImage } from '../queries';

import { PictureDialogInterface } from '../interfaces/picture-dialog.interface';

interface PictureDialogContainerProps {
  imageId: string;
}

export async function PictureDialogContainer({
  imageId,
}: PictureDialogContainerProps) {
  const imageIdAsNumber = parseInt(imageId);
  if (Number.isNaN(imageIdAsNumber)) throw new Error('Invalid photo id');

  const image = await getImage(imageIdAsNumber);

  return <PictureDialogInterface image={image} />;
}
