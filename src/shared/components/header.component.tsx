import Link from 'next/link';
import { ClerkLoading, SignInButton, UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { LogInIcon } from 'lucide-react';

import { Skeleton } from './skeleton.component';

export function Header() {
  const user = auth();

  const isAuthenticated = user.userId !== null;

  return (
    <>
      <div className="h-20" />
      <header className="fixed left-0 right-0 top-0 z-[1000] h-20 border-b border-orange-500 bg-zinc-950">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
          <nav>
            <ul>
              <li>
                <Link
                  href="/"
                  className="text-lg font-bold tracking-wide text-orange-400 hover:brightness-110"
                >
                  Gallerysy
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex">
            <ClerkLoading>
              <Skeleton className="h-10 w-10 rounded-full" />
            </ClerkLoading>
            {isAuthenticated ? (
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: {
                      width: 40,
                      height: 40,
                    },
                  },
                }}
              />
            ) : (
              <SignInButton>
                <button
                  aria-label="Sign in"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 transition-colors hover:bg-zinc-700"
                >
                  <LogInIcon className="h-6 w-6 text-zinc-100" />
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
