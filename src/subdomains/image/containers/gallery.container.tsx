import { getBase64 } from '@shared/helpers/get-base-64';
import type { TImage, TPhoto } from '@shared/types/image.type';

import { AppLayout } from '@shared/layouts/app.layout';
import { GalleryInterface } from '../interfaces/gallery.interface';
import { getImages } from '../queries';

async function addBlurredDataUrls(images: TImage[]): Promise<TPhoto[]> {
  const base64Promises = images.map((image) => getBase64(image.imageUrl));
  const base64Results = await Promise.all(base64Promises);
  const photosWithBlur: TPhoto[] = images.map((photo, i) => {
    return {
      ...photo,
      blurredDataUrl: base64Results[i],
    };
  });
  return photosWithBlur;
}

export async function GalleryContainer() {
  const images = await getImages();
  const data = await addBlurredDataUrls(images);

  return (
    <AppLayout>
      <GalleryInterface images={data} />
    </AppLayout>
  );
}
