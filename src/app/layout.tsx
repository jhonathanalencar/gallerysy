import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';

import { RootInfrastructure } from '@shared/infrastructure/root.infrastructure';

const noto_sans = Noto_Sans({
  subsets: ['latin'],
  variable: '--font-noto-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`),
  title: {
    template: 'Gallerysy | %s',
    default: 'Gallerysy',
  },
  description:
    'Gallerysy is an image gallery for upload, store and manage your favorite images.',
  openGraph: {
    title: 'Gallerysy',
    description:
      'An image gallery for upload, store and manage your favorite images.',
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: 'Gallerysy',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full">
      <body className={`${noto_sans.className} h-full antialiased`}>
        <RootInfrastructure>
          {children}
          {modal}
        </RootInfrastructure>
      </body>
    </html>
  );
}
