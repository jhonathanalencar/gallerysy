'use client';

import { useCallback, useRef, useState } from 'react';
import Link from 'next/link';

import type { TPhoto } from '@shared/types/image.type';
import { getImagesAction } from '../actions';

import { Photo } from '../components/photo.component';

interface GalleryInterfaceProps {
  images: TPhoto[];
}

export function GalleryInterface({
  images: initialImages,
}: GalleryInterfaceProps) {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState<TPhoto[]>(initialImages);

  const intersectionObserver = useRef<IntersectionObserver | null>(null);
  const lastPhotoRef = useCallback(
    (photo: HTMLAnchorElement) => {
      if (intersectionObserver.current) {
        intersectionObserver.current.disconnect();
      }
      intersectionObserver.current = new IntersectionObserver(
        async (photos) => {
          if (photos[0].isIntersecting) {
            const nextPage = page + 1;
            const images = await getImagesAction(nextPage);
            if (images.length > 0) {
              setPage(nextPage);
              setImages((prev) => {
                return [...prev, ...images];
              });
            }
          }
        }
      );
      if (photo) {
        intersectionObserver.current.observe(photo);
      }
    },
    [page]
  );

  return (
    <section aria-label="Gallery" className="mx-auto min-h-full max-w-7xl p-4">
      <div className="grid grid-cols-gallery gap-4">
        {images.length > 0 ? (
          images.map((image, index) => {
            if (index + 1 === images.length) {
              return (
                <Photo
                  key={image.imageId}
                  ref={lastPhotoRef}
                  image={image}
                  priority={index < 9 ? true : false}
                />
              );
            } else {
              return (
                <Photo
                  key={image.imageId}
                  image={image}
                  priority={index < 9 ? true : false}
                />
              );
            }
          })
        ) : (
          <div className="flex flex-col justify-center text-center">
            <p className="text-xl font-semibold text-zinc-300 md:text-xl">
              Your image gallery is empty
            </p>
            <span className="text-zinc-400">Start uploading images</span>
            <Link
              href="/dashboard"
              className="mt-6 text-base font-medium text-primary hover:underline"
            >
              Upload Images
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
