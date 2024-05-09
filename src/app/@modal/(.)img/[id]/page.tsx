import { imageRoutes } from '@subdomains/image/routes';

interface PictureDialogPageProps {
  params: {
    id: string;
  };
}

export default function PictureDialogPage({ params }: PictureDialogPageProps) {
  return <imageRoutes.PICTURE_DIALOG imageId={params.id} />;
}
