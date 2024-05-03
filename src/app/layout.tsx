import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';

import '../assets/styles/globals.css';

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
    <html lang="en" className="h-full">
      <body className={`${noto_sans.className} h-full antialiased`}>
        {children}
      </body>
    </html>
  );
}
