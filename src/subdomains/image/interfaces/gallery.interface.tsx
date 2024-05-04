import Image from 'next/image';

interface GalleryInterfaceProps {
  images: {
    id: string;
    imageUrl: string;
  }[];
}

export function GalleryInterface({ images }: GalleryInterfaceProps) {
  return (
    <section className="mx-auto min-h-full max-w-7xl p-4">
      <div className="grid-cols-gallery grid gap-4">
        {images.map((image) => {
          return (
            <div
              key={image.id}
              className="group relative aspect-video w-full overflow-hidden rounded bg-zinc-800 shadow-md "
            >
              <Image
                src={image.imageUrl}
                alt="something"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
                priority
                className="h-full w-full object-contain"
              />
              <div className="absolute inset-0 flex w-full translate-y-full items-end truncate bg-gradient-to-t from-black/75 to-transparent pl-2 transition-transform group-hover:translate-y-0">
                <span className="font-medium text-white">
                  image-{image.id}.png
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
