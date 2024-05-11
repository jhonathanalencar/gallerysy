import type { Metadata } from 'next';

import { dashboardRoutes } from '@subdomains/dashboard/routes';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function DashboardPage() {
  return <dashboardRoutes.DASHBOARD />;
}
