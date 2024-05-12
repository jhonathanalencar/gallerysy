import { getImages } from '../../queries';
import { CustomError } from '@shared/errors/custom-error.error';

import { GalleryInterface } from '../../interfaces/gallery.interface';
import { ErrorMessage } from '@shared/components/error-message.component';

export async function GalleryContainerLoader() {
  try {
    const images = await getImages();

    return <GalleryInterface images={images} />;
  } catch (error) {
    if (error instanceof CustomError) {
      return <ErrorMessage>{error.message}</ErrorMessage>;
    }
    return <ErrorMessage />;
  }
}
