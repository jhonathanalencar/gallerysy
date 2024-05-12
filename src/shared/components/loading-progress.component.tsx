'use client';

import { useEffect } from 'react';
import NProgress from 'nprogress';

NProgress.configure({ showSpinner: false });

export function LoadingProgress() {
  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);
  return null;
}
