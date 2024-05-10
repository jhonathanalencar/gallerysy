'use client';

import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { XIcon } from 'lucide-react';

import type { TPhoto } from '@shared/types/image.type';
import { deleteImagesAction } from '../actions';

import { UploadButton } from '@shared/components/upload-button.component';
import { Checkbox } from '@shared/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@shared/components/ui/table';

interface DashboardInterfaceProps {
  images: TPhoto[];
}

export function DashboardInterface({ images }: DashboardInterfaceProps) {
  const [selectedImageIds, setSelectedImageIds] = useState<number[]>([]);
  const [isPending, startTransition] = useTransition();

  function handleOnCheckedChange(imageId: number) {
    if (selectedImageIds.includes(imageId)) {
      setSelectedImageIds((prev) => prev.filter((id) => id !== imageId));
    } else {
      setSelectedImageIds((prev) => [imageId, ...prev]);
    }
  }

  function handleSelectAll(state: boolean) {
    if (state === true) {
      setSelectedImageIds(images.map((image) => image.imageId));
    }
    if (state === false) {
      setSelectedImageIds([]);
    }
  }

  return (
    <section className="mx-auto min-h-full max-w-7xl p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">Files</h3>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          {selectedImageIds.length > 0 ? (
            <form
              action={() => {
                startTransition(async () => {
                  toast.loading('Deleting images...', {
                    id: 'delete-started',
                    style: {
                      backgroundColor: 'hsl(20 14.3% 4.1%)',
                      color: 'hsl(20.5 90.2% 48.2%)',
                      borderColor: 'hsl(12 6.5% 15.1%)',
                    },
                  });
                  const data = await deleteImagesAction(selectedImageIds);
                  if (data?.error) {
                    toast.dismiss('delete-started');
                    toast.error(data.error.message, {
                      style: {
                        backgroundColor: 'hsl(20 14.3% 4.1%)',
                        color: 'hsl(20.5 90.2% 48.2%)',
                        borderColor: 'hsl(12 6.5% 15.1%)',
                      },
                    });
                    return;
                  }
                  toast.dismiss('delete-started');
                  toast.success(
                    `Successfully deleted ${selectedImageIds.length} image(s)`,
                    {
                      style: {
                        backgroundColor: 'hsl(20 14.3% 4.1%)',
                        color: 'hsl(20.5 90.2% 48.2%)',
                        borderColor: 'hsl(12 6.5% 15.1%)',
                      },
                    }
                  );
                  setSelectedImageIds([]);
                });
              }}
            >
              <button
                type="submit"
                disabled={isPending}
                className="flex items-center gap-2 rounded bg-black/40 px-4 py-2 outline-none hover:bg-black/60 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 disabled:cursor-not-allowed disabled:bg-black/40 disabled:opacity-70"
              >
                <XIcon className="h-5 w-5 text-orange-400" />
                <span>Delete</span>
              </button>
            </form>
          ) : null}
          <UploadButton />
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table className="mt-3 min-w-[48rem] border">
          <TableCaption>A list of files that have been uploaded.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Checkbox onCheckedChange={handleSelectAll} />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Url</TableHead>
              <TableHead>Uploaded at</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {images.map((image) => {
              return (
                <TableRow key={image.imageId}>
                  <TableHead>
                    <Checkbox
                      checked={selectedImageIds.includes(image.imageId)}
                      onCheckedChange={() =>
                        handleOnCheckedChange(image.imageId)
                      }
                    />
                  </TableHead>
                  <TableCell>{image.name}</TableCell>
                  <TableCell>
                    <span className="line-clamp-1">{image.imageUrl}</span>
                  </TableCell>
                  <TableCell className="text-left">
                    {Intl.DateTimeFormat('en-US', {
                      dateStyle: 'long',
                      timeStyle: 'short',
                    }).format(new Date(image.createdAt))}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
