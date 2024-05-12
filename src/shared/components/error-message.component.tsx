import { ReactNode } from 'react';

interface ErrorMessageProps {
  children?: ReactNode;
}

export function ErrorMessage({ children }: ErrorMessageProps) {
  return (
    <h1 className="mt-4 text-center text-3xl font-bold tracking-tight text-zinc-100 md:text-4xl">
      {children || 'Something went wrong'}
    </h1>
  );
}
