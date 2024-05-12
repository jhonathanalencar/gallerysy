import { Suspense } from 'react';

import { AppLayout } from '@shared/layouts/app.layout';
import { DashboardContainerLoader } from './dashboard-loader.container';
import { DashboardContainerSkeleton } from './dashboard-skeleton.container';

export function DashboardContainer() {
  return (
    <AppLayout>
      <Suspense fallback={<DashboardContainerSkeleton />}>
        <DashboardContainerLoader />
      </Suspense>
    </AppLayout>
  );
}
