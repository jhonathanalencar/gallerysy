import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { extractRouterConfig } from 'uploadthing/server';

import { ourFileRouter } from '@/app/api/uploadthing/core';

import { Toaster } from '../components/ui/sonner';

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
      <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
      <Toaster position="top-right" />
      {children}
    </ClerkProvider>
  );
}
