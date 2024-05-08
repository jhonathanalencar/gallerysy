import type { TImage, TPhoto } from '@shared/types/image.type';
import { getBase64 } from './get-base-64';

export async function addBlurredDataUrls(images: TImage[]): Promise<TPhoto[]> {
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
