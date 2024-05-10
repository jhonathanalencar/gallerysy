'use server';

import { getImages } from './queries';

export async function getImagesAction(page: number = 1, limit: number = 15) {
  const images = await getImages(page, limit);
  return images;
}
