import { twMerge } from 'tailwind-merge';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      role="status"
      className={twMerge('animate-shimmer bg-shimmer', className)}
    />
  );
}
