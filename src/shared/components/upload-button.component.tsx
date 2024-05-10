import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { UploadIcon } from 'lucide-react';

import { useUploadThing } from '../libs/uploadthing.lib';

type Input = Parameters<typeof useUploadThing>;

const useUploadThingInputProps = (...args: Input) => {
  const $ut = useUploadThing(...args);

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const selectedFiles = Array.from(event.target.files);
    const result = await $ut.startUpload(selectedFiles);

    console.log('uploaded files', result);
  };

  return {
    inputProps: {
      onChange,
      multiple: ($ut.permittedFileInfo?.config?.image?.maxFileCount ?? 1) > 1,
      accept: 'image/*',
    },
    isUploading: $ut.isUploading,
  };
};

export function UploadButton() {
  const [, setImages] = useState<
    {
      fileUrl: string;
      fileKey: string;
    }[]
  >([]);
  const router = useRouter();

  const { inputProps, isUploading } = useUploadThingInputProps(
    'imageUploader',
    {
      onUploadBegin() {
        toast.loading('Uploading...', {
          position: 'top-right',
          id: 'upload-started',
          style: {
            backgroundColor: 'hsl(20 14.3% 4.1%)',
            color: 'hsl(20.5 90.2% 48.2%)',
            borderColor: 'hsl(12 6.5% 15.1%)',
          },
        });
      },
      onUploadError(error) {
        console.error(`ERROR! ${error.message}`);
        toast.dismiss('upload-started');
        toast.error(error.message || 'Failed to upload file', {
          position: 'top-right',
          style: {
            backgroundColor: 'hsl(20 14.3% 4.1%)',
            color: 'hsl(20.5 90.2% 48.2%)',
            borderColor: 'hsl(12 6.5% 15.1%)',
          },
        });
      },
      onClientUploadComplete(res) {
        setImages(
          res.map((file) => {
            return {
              fileKey: file.key,
              fileUrl: file.url,
            };
          })
        );
        toast.dismiss('upload-started');
        toast.success('Upload Completed', {
          position: 'top-right',
          style: {
            backgroundColor: 'hsl(20 14.3% 4.1%)',
            color: 'hsl(20.5 90.2% 48.2%)',
            borderColor: 'hsl(12 6.5% 15.1%)',
          },
        });
        router.refresh();
      },
    }
  );

  return (
    <div>
      <label
        htmlFor="upload"
        className="flex cursor-pointer items-center gap-2 rounded bg-black/40 px-4 py-2 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-zinc-900 hover:bg-black/60 has-[:disabled]:cursor-not-allowed has-[:disabled]:bg-black/40"
      >
        <UploadIcon className="h-5 w-5 text-orange-400" />
        <span>Upload</span>
        <input
          id="upload"
          type="file"
          disabled={isUploading}
          className="peer sr-only"
          {...inputProps}
        />
      </label>
    </div>
  );
}
