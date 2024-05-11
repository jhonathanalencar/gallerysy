import { getAllImages } from '@/subdomains/image/queries';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const images = await getAllImages();
  const imagesEntries: MetadataRoute.Sitemap = images.map((image) => {
    return {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/img/${image.imageId}`,
    };
  });

  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    },
    ...imagesEntries,
  ];
}
