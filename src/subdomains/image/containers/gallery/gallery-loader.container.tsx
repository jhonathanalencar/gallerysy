import { getImages } from '../../queries';

import { GalleryInterface } from '../../interfaces/gallery.interface';
import { CustomError } from '@shared/errors/custom-error.error';

export async function GalleryContainerLoader() {
  try {
    const images = await getImages();

    return <GalleryInterface images={images} />;
  } catch (error) {
    if (error instanceof CustomError) {
      return (
        <h1 className="mt-4 text-center text-3xl font-bold tracking-tight text-zinc-100 md:text-4xl">
          {error.message}
        </h1>
      );
    }
    return (
      <h1 className="mt-4 text-center text-3xl font-bold tracking-tight text-zinc-100 md:text-4xl">
        Something went wrong
      </h1>
    );
  }
}
