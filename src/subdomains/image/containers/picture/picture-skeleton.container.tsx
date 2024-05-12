import { Skeleton } from '@shared/components/skeleton.component';

export function PictureContainerSkeleton() {
  return (
    <section>
      <div className="absolute left-0 top-20 h-full w-full bg-zinc-900" />
      <div className="absolute left-0 top-20 flex aspect-[3/2] h-full w-full items-center justify-center">
        <Skeleton className="relative aspect-[3/2] w-full max-w-7xl" />
      </div>
    </section>
  );
}
