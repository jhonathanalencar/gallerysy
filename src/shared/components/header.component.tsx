'use client';

import Link from 'next/link';
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  UserButton,
  useAuth,
} from '@clerk/nextjs';
import { LayoutDashboardIcon, LogInIcon } from 'lucide-react';

import { Skeleton } from './skeleton.component';
import { UploadButton } from '../libs/uploadthing.lib';
import { useRouter } from 'next/navigation';

export function Header() {
  const { isSignedIn: isAuthenticated } = useAuth();
  const router = useRouter();

  return (
    <>
      <div className="h-20" />
      <header className="fixed left-0 right-0 top-0 z-[1000] h-20 border-b border-orange-500 bg-zinc-950">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
          <Link
            href="/"
            className="text-lg font-bold tracking-wide text-orange-400 hover:brightness-110 md:text-xl"
          >
            Gallerysy
          </Link>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              console.log('Files: ', res);
              console.log('Upload Completed');
              router.refresh();
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              console.error(`ERROR! ${error.message}`);
            }}
          />

          <div className="flex">
            <ClerkLoading>
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <Skeleton className="h-6 w-6 rounded" />
                  <Skeleton className="h-10 w-10 rounded-full" />
                </div>
              ) : (
                <Skeleton className="h-10 w-10 rounded-full" />
              )}
            </ClerkLoading>
            <ClerkLoaded>
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <nav>
                    <ul>
                      <li>
                        <Link
                          href="/dashboard"
                          aria-label="Dashboard"
                          title="Dashboard"
                          className="text-sm font-medium text-orange-400 hover:brightness-110 md:text-base"
                        >
                          <LayoutDashboardIcon className="h-6 w-6" />
                        </Link>
                      </li>
                    </ul>
                  </nav>
                  <div className="h-10 w-10 rounded-full bg-shimmer">
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
                  </div>
                </div>
              ) : (
                <SignInButton>
                  <button
                    aria-label="Sign in"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 transition-colors hover:bg-zinc-700"
                  >
                    <LogInIcon className="h-6 w-6 text-orange-400" />
                  </button>
                </SignInButton>
              )}
            </ClerkLoaded>
          </div>
        </div>
      </header>
    </>
  );
}
