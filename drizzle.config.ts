import type { Config } from 'drizzle-kit';

import { env } from '@shared/helpers/env';

export default {
  schema: './src/externals/storage/schema.storage.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.POSTGRES_URL,
  },
  tablesFilter: ['gallerysy_*'],
  verbose: true,
  strict: true,
} satisfies Config;
