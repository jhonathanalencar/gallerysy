import { auth } from '@clerk/nextjs/server';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';

import { db } from '@externals/storage/connection.storage';
import { image as imageSchema } from '@externals/storage/schema.storage';

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB', maxFileCount: 10 } })
    .middleware(async ({ files }) => {
      const session = auth();
      if (!session.userId) throw new UploadThingError('Unauthenticated');

      const user = await db.query.user.findFirst({
        where: (model, { eq }) => eq(model.userId, session.userId),
      });
      if (!user) throw new UploadThingError('Unauthorized');
      if (!user.canUpload) throw new UploadThingError('Unauthorized');

      const fileNames = files.map((file) => file.name);
      const foundImages = await db.query.image.findMany({
        where: (model, { inArray }) => inArray(model.name, fileNames),
      });
      if (foundImages.length > 0) {
        throw new UploadThingError('Duplicate file name');
      }

      return { userId: session.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await db.insert(imageSchema).values([
        {
          imageUrl: file.url,
          name: file.name,
          userId: metadata.userId,
        },
      ]);
      return { uploadedBy: metadata.userId };
    }),
  mediaPost: f({
    image: { maxFileSize: '2MB', maxFileCount: 4 },
    video: { maxFileSize: '256MB', maxFileCount: 1 },
  })
    .middleware(async () => {
      const session = auth();
      if (!session.userId) throw new UploadThingError('Unauthenticated');

      return { userId: session.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('Upload complete for userId:', metadata.userId);
      console.log('file url', file.url);
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
