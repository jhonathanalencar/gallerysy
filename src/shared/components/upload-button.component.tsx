import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { UploadButton as UtUploadButton } from '../libs/uploadthing.lib';

export function UploadButton() {
  const router = useRouter();

  return (
    <UtUploadButton
      className="ut-button:bg-primary ut-button:text-background ut-allowed-content:text-foreground ut-button:ring-primary ut-uploading:text-background ut-button:ut-uploading:bg-secondary ut-button:font-bold ut-button:ring-offset-zinc-950 hover:ut-button:brightness-110 ut-button:ut-uploading:cursor-not-allowed"
      endpoint="imageUploader"
      onClientUploadComplete={() => {
        toast.success('Upload Completed', {
          position: 'top-right',
          style: {
            backgroundColor: 'hsl(20 14.3% 4.1%)',
            color: 'hsl(20.5 90.2% 48.2%)',
            borderColor: 'hsl(12 6.5% 15.1%)',
          },
        });
        router.refresh();
      }}
      onUploadError={(error) => {
        console.error(`ERROR! ${error.message}`);
        toast.error(error.message || 'Failed to upload file', {
          position: 'top-right',
          style: {
            backgroundColor: 'hsl(20 14.3% 4.1%)',
            color: 'hsl(20.5 90.2% 48.2%)',
            borderColor: 'hsl(12 6.5% 15.1%)',
          },
        });
      }}
    />
  );
}
