import { getImages } from '@subdomains/image/queries';

import { AppLayout } from '@shared/layouts/app.layout';
import { DashboardInterface } from '../interfaces/dashboard.interface';

export async function DashboardContainer() {
  const images = await getImages();

  return (
    <AppLayout>
      <DashboardInterface images={images} />
    </AppLayout>
  );
}
