import { imageRoutes } from '@subdomains/image/routes';

interface PicturePageProps {
  params: {
    id: string;
  };
}

export default function PicturePage({ params }: PicturePageProps) {
  return <imageRoutes.PICTURE imageId={params.id} />;
}
