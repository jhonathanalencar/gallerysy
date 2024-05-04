import Image from 'next/image';

interface GalleryInterfaceProps {
  images: {
    id: string;
    imageUrl: string;
    blurredDataUrl: string;
  }[];
}

export function GalleryInterface({ images }: GalleryInterfaceProps) {
  return (
    <section className="mx-auto min-h-full max-w-7xl p-4">
      <div className="grid grid-cols-gallery gap-4">
        {images.map((image) => {
          return (
            <div
              key={image.id}
              className="group relative aspect-video w-full overflow-hidden rounded bg-zinc-800 shadow-md "
            >
              <Image
                src={image.imageUrl}
                alt="something"
                placeholder="blur"
                blurDataURL={image.blurredDataUrl}
                sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
                fill
                priority
                className="h-full w-full object-contain group-hover:brightness-110"
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
