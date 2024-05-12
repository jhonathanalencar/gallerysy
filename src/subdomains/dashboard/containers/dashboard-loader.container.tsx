import { getImages } from '@subdomains/image/queries';
import { CustomError } from '@shared/errors/custom-error.error';

import { DashboardInterface } from '../interfaces/dashboard.interface';
import { ErrorMessage } from '@shared/components/error-message.component';

export async function DashboardContainerLoader() {
  try {
    const images = await getImages();

    return <DashboardInterface images={images} />;
  } catch (error) {
    if (error instanceof CustomError) {
      return <ErrorMessage>{error.message}</ErrorMessage>;
    }
    return <ErrorMessage />;
  }
}
