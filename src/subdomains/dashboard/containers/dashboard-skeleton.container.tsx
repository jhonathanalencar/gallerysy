import { Skeleton } from '@shared/components/skeleton.component';

export function DashboardContainerSkeleton() {
  return (
    <section className="mx-auto min-h-full max-w-7xl p-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-10 w-28 rounded" />
      </div>
      <div className="mt-3">
        <Skeleton className="h-12 w-full" />
        {Array.from(Array(10).keys()).map((index) => {
          return <Skeleton key={index} className="h-[53px] w-full" />;
        })}
      </div>
    </section>
  );
}
