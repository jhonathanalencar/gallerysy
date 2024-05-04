import { getPlaiceholder } from 'plaiceholder';

export async function getBase64(imageUrl: string) {
  try {
    const response = await fetch(imageUrl, { cache: 'no-cache' });
    if (!response.ok) {
      throw new Error(
        `Failed to fetch image: ${response.status} ${response.statusText}`
      );
    }
    const buffer = await response.arrayBuffer();
    const { base64 } = await getPlaiceholder(Buffer.from(buffer), {
      size: 10,
    });
    return base64;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.stack);
    }
  }
}
