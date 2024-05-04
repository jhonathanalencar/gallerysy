import { getBase64 } from '@shared/helpers/get-base-64';

import { AppLayout } from '@shared/layouts/app.layout';
import { GalleryInterface } from '../interfaces/gallery.interface';

const imageUrls = [
  'https://utfs.io/f/6065bed9-0305-45f8-8cea-b0670202385f-g4e7r2.jpg',
  'https://utfs.io/f/7765ad48-fbc7-4ab3-8842-bdc0c95091a8-5qhxq.jpg',
  'https://utfs.io/f/28770ec6-8c9e-48e1-8781-6acac167516a-7hutyu.jpg',
  'https://utfs.io/f/89309483-bef5-4477-a154-92defe792604-8l2nhm.jpg',
  'https://utfs.io/f/87c155ec-1680-49f7-8354-5647f97065d4-22soft.png',
  'https://utfs.io/f/93a65de5-3636-4c5f-bbf4-fb902e67334c-5oc4oy.png',
  'https://utfs.io/f/a970fe10-a621-47dc-ab8e-4db136adbd7b-uoz8dv.jpg',
];

const mockData = imageUrls.map((imageUrl, index) => {
  return {
    id: String(index + 1),
    imageUrl,
    blurredDataUrl: '',
  };
});

type Photo = {
  id: string;
  imageUrl: string;
  blurredDataUrl: string;
};

async function addBlurredDataUrls(images: Photo[]): Promise<Photo[]> {
  const base64Promises = images.map((image) => getBase64(image.imageUrl));
  const base64Results = await Promise.all(base64Promises);
  const photosWithBlur: Photo[] = images.map((photo, i) => {
    photo.blurredDataUrl = base64Results[i] ?? '';
    return photo;
  });
  return photosWithBlur;
}

export async function GalleryContainer() {
  const data = await addBlurredDataUrls(mockData);

  return (
    <AppLayout>
      <GalleryInterface images={data} />
    </AppLayout>
  );
}
