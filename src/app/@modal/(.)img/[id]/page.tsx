'use client';

import { useRouter } from 'next/navigation';
import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import { XIcon } from 'lucide-react';

interface ImgPageProps {
  params: {
    id: string;
  };
}

export default function ImgPage({ params }: ImgPageProps) {
  const router = useRouter();
  console.log(params.id);
  return (
    <div>
      <Dialog.Root
        defaultOpen
        onOpenChange={(open) => {
          if (!open) {
            router.back();
          }
        }}
      >
        <Dialog.Trigger />
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[1001] flex items-center justify-center bg-black/70 backdrop-blur-2xl">
            <Dialog.Content className="relative aspect-[3/2] w-full max-w-7xl">
              <div className="relative h-full w-full bg-zinc-900">
                <Image
                  src={
                    'https://utfs.io/f/28770ec6-8c9e-48e1-8781-6acac167516a-7hutyu.jpg'
                  }
                  alt={'touka'}
                  sizes="100vw"
                  fill
                  priority
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="absolute left-0 top-0 p-3">
                <Dialog.Close className="rounded-full border bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white">
                  <XIcon className="h-5 w-5" />
                </Dialog.Close>
              </div>
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
