'server-only';
import { cache } from 'react';
import { auth } from '@clerk/nextjs/server';

import { db } from '@externals/storage/connection.storage';
import { addBlurredDataUrls } from '@shared/helpers/add-blurred-data-urls';

export const getImages = cache(async () => {
  const session = auth();
  if (!session.userId) throw new Error('Unauthenticated');
  const imagesData = await db.query.image.findMany({
    where: (model, { eq }) => eq(model.userId, session.userId),
    orderBy: (model, { desc }) => desc(model.imageId),
    limit: 12,
  });
  const images = await addBlurredDataUrls(imagesData);
  return images;
});

export const getImage = cache(async (imageId: number, userId: string) => {
  const session = auth();
  if (!session.userId) throw new Error('Unauthenticated');
  const imagesData = await db.query.image.findFirst({
    where: (model, { eq, and }) =>
      and(eq(model.imageId, imageId), eq(model.userId, userId)),
  });
  if (!imagesData) throw new Error('Image not found');
  const [image] = await addBlurredDataUrls([imagesData]);
  return image;
});
