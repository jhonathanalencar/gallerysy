import { getImages } from '@subdomains/image/queries';
import { CustomError } from '@shared/errors/custom-error.error';

import { DashboardInterface } from '../interfaces/dashboard.interface';

export async function DashboardContainerLoader() {
  try {
    const images = await getImages();

    return <DashboardInterface images={images} />;
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
