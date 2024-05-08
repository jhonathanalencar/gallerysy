import { getImages } from '../../queries';

import { GalleryInterface } from '../../interfaces/gallery.interface';

export async function GalleryContainerLoader() {
  const images = await getImages();

  return <GalleryInterface images={images} />;
}
