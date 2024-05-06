import { ClerkProvider } from '@clerk/nextjs';

import '@assets/styles/globals.css';

interface RootInfrastructureProps {
  children: React.ReactNode;
}

export function RootInfrastructure({ children }: RootInfrastructureProps) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
