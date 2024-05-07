import 'server-only';
import { cache } from 'react';
import { auth } from '@clerk/nextjs/server';

export const verifySession = cache(() => {
  const session = auth();

  if (!session.userId) {
    return { isAuthenticated: false, userId: null };
  }

  return { isAuthenticated: true, userId: session.userId };
});
