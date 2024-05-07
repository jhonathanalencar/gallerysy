import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

import '@assets/styles/globals.css';

interface RootInfrastructureProps {
  children: React.ReactNode;
}

export function RootInfrastructure({ children }: RootInfrastructureProps) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      {children}
    </ClerkProvider>
  );
}
