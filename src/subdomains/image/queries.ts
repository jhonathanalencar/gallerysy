'server-only';

import { db } from '@externals/storage/connection.storage';

export async function getImages() {
  return await db.query.image.findMany({
    orderBy: (model, { desc }) => desc(model.imageId),
  });
}
