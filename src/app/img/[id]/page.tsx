import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { imageRoutes } from '@subdomains/image/routes';
import { getAllImages, getImage } from '@subdomains/image/queries';

interface PicturePageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const images = await getAllImages();
  return images.map((image) => ({
    id: String(image.imageId),
  }));
}

export async function generateMetadata({
  params: { id },
}: PicturePageProps): Promise<Metadata> {
  const imageIdAsNumber = parseInt(id);
  const image = await getImage(imageIdAsNumber);
  if (!image) return notFound();
  return {
    title: image.name,
    description: `Picture of ${image.name}`,
    openGraph: {
      images: [
        {
          url: image.imageUrl,
        },
      ],
    },
  };
}

export default function PicturePage({ params }: PicturePageProps) {
  return <imageRoutes.PICTURE imageId={params.id} />;
}
