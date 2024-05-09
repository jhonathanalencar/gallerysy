'server-only';
import { cache } from 'react';

import { db } from '@externals/storage/connection.storage';
import { addBlurredDataUrls } from '@shared/helpers/add-blurred-data-urls';

export const getImages = cache(async () => {
  const imagesData = await db.query.image.findMany({
    orderBy: (model, { desc }) => desc(model.imageId),
    limit: 12,
  });
  const images = await addBlurredDataUrls(imagesData);
  return images;
});

export const getImage = cache(async (imageId: number) => {
  const imagesData = await db.query.image.findFirst({
    where: (model, { eq }) => eq(model.imageId, imageId),
  });
  if (!imagesData) throw new Error('Image not found');
  const [image] = await addBlurredDataUrls([imagesData]);
  return image;
});
