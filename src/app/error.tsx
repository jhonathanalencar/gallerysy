'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import * as Sentry from '@sentry/nextjs';

import { AppLayout } from '@shared/layouts/app.layout';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <AppLayout>
      <section className="mx-auto min-h-full max-w-7xl p-4">
        <div className="grid place-items-center">
          <p className="text-base font-semibold text-orange-500 md:text-lg">
            An error has occurred
          </p>
          <h1 className="mt-4 text-center text-3xl font-bold tracking-tight text-zinc-100 md:text-4xl">
            {error.message || 'Something went wrong'}
          </h1>
          <p className="mt-6 text-center text-base text-zinc-400">
            Please try again later or contact support if the problem persists.
          </p>
          <div className="mt-10 flex flex-col items-center gap-6 sm:flex-row">
            <button
              onClick={() => reset()}
              className="h-12 w-28 rounded border border-orange-400 bg-orange-400/10 font-semibold text-orange-400 outline-none hover:bg-orange-400/20 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
            >
              Try again
            </button>
            <Link
              href="/"
              className="flex h-12 items-center justify-center rounded border border-zinc-800 bg-zinc-800/0 px-4 font-semibold outline-none hover:bg-zinc-800/30 focus-visible:ring-2 focus-visible:ring-zinc-700 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
            >
              Go back home
            </Link>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
