import { Skeleton } from '@shared/components/skeleton.component';

export function PictureDialogContainerSkeleton() {
  return (
    <section>
      <div className="fixed inset-0 z-[1001] flex items-center justify-center bg-black/70 backdrop-blur-2xl">
        <div className="relative aspect-[3/2] w-full max-w-7xl">
          <div className="relative h-full w-full bg-zinc-900">
            <Skeleton className="h-full w-full object-contain" />
          </div>
          <div className="absolute left-0 top-0 p-3">
            <Skeleton className="h-[38px] w-[38px] rounded-full border" />
          </div>
        </div>
      </div>
    </section>
  );
}
