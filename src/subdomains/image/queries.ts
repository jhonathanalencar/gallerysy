'server-only';
import { cache } from 'react';
import { auth } from '@clerk/nextjs/server';

import { db } from '@externals/storage/connection.storage';
import { addBlurredDataUrls } from '@shared/helpers/add-blurred-data-urls';
import { UnauthenticatedError } from '@shared/errors/unauthenticated.error';

export const getImages = cache(async (page: number = 1, limit: number = 15) => {
  const session = auth();
  if (!session.userId) throw new UnauthenticatedError();
  const offset = (page - 1) * limit;
  const imagesData = await db.query.image.findMany({
    where: (model, { eq }) => eq(model.userId, session.userId),
    orderBy: (model, { desc }) => desc(model.imageId),
    limit,
    offset,
  });
  const images = await addBlurredDataUrls(imagesData);
  return images;
});

export const getImage = cache(async (imageId: number) => {
  const session = auth();
  if (!session.userId) throw new Error('Unauthenticated');
  const imagesData = await db.query.image.findFirst({
    where: (model, { eq, and }) =>
      and(eq(model.imageId, imageId), eq(model.userId, session.userId)),
  });
  if (!imagesData) return;
  const [image] = await addBlurredDataUrls([imagesData]);
  return image;
});
