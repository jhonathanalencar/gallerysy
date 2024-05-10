'use client';

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

import type { TPhoto } from '@shared/types/image.type';

interface DashboardInterfaceProps {
  images: TPhoto[];
}

export function DashboardInterface({ images }: DashboardInterfaceProps) {
  return (
    <section className="mx-auto min-h-full max-w-7xl p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">Files</h3>
        <UploadButton />
      </div>
      <div className="overflow-x-auto">
        <Table className="mt-3 min-w-[48rem] border">
          <TableCaption>A list of files that have been uploaded.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Checkbox />
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
                    <Checkbox />
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
