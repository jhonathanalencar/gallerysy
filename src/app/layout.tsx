import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';

import { RootInfrastructure } from '@shared/infrastructure/root.infrastructure';

const noto_sans = Noto_Sans({
  subsets: ['latin'],
  variable: '--font-noto-sans',
});

export const metadata: Metadata = {
  title: {
    template: 'Gallerysy | %s',
    default: 'Gallerysy',
  },
  description:
    'Gallerysy is an image gallery for upload, store and manage your favorite images.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full">
      <body className={`${noto_sans.className} h-full antialiased`}>
        <RootInfrastructure>{children}</RootInfrastructure>
      </body>
    </html>
  );
}
