'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';

export default function GlobalError({
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
    <html lang="en" className="h-full">
      <body className="h-full antialiased">
        <div className="flex min-h-full flex-col bg-zinc-900 text-zinc-100">
          <main className="flex-1">
            <section className="mx-auto min-h-full max-w-7xl p-4">
              <div className="grid place-items-center">
                <p className="text-base font-semibold text-orange-500 md:text-lg">
                  An error has occurred
                </p>
                <h1 className="mt-4 text-center text-3xl font-bold tracking-tight text-zinc-100 md:text-5xl">
                  Something went wrong
                </h1>
                <p className="mt-6 text-center text-base text-zinc-400">
                  Please try again later or contact support if the problem
                  persists.
                </p>
                <div className="mt-10">
                  <button
                    onClick={() => reset()}
                    className="h-12 w-28 rounded border border-orange-400 bg-orange-400/10 font-semibold text-orange-400 outline-none hover:bg-orange-400/20 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
                  >
                    Try again
                  </button>
                </div>
              </div>
            </section>
          </main>
        </div>
      </body>
    </html>
  );
}
