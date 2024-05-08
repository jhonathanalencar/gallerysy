import { Skeleton } from '@shared/components/skeleton.component';

export function GalleryContainerSkeleton() {
  return (
    <section
      aria-label="Gallery Loading"
      className="mx-auto min-h-full max-w-7xl p-4"
    >
      <div className="grid grid-cols-gallery gap-4">
        {Array.from(Array(9).keys()).map((index) => {
          return (
            <Skeleton
              key={index}
              className="aspect-video h-full w-full rounded bg-cover shadow-md"
            />
          );
        })}
      </div>
    </section>
  );
}
