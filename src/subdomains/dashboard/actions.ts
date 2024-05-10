'use server';

import 'server-only';
import { revalidatePath } from 'next/cache';
import { inArray } from 'drizzle-orm';

import { db } from '@externals/storage/connection.storage';
import { image } from '@externals/storage/schema.storage';

export async function deleteImagesAction(selectedIds: number[]) {
  try {
    await db.delete(image).where(inArray(image.imageId, selectedIds));
  } catch (error) {
    console.error();
    return {
      error: { message: 'Failed to delete selected image(s)' },
    };
  }
  revalidatePath('/dashboard');
}
