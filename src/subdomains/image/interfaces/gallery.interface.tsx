import Image from 'next/image';

interface GalleryInterfaceProps {
  images: {
    id: string;
    imageUrl: string;
  }[];
}

export function GalleryInterface({ images }: GalleryInterfaceProps) {
  return (
    <section className="grid grid-cols-3">
      {images.map((image) => {
        return (
          <div
            key={image.id}
            className="relative aspect-video w-full bg-zinc-800"
          >
            <Image
              src={image.imageUrl}
              alt="something"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
              priority
              className="h-full w-full object-contain"
            />
          </div>
        );
      })}
    </section>
  );
}
