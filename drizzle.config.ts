import type { Config } from 'drizzle-kit';

import { env } from '@shared/helpers/env';

export default {
  schema: './src/externals/storage/schema.storage.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: env.POSTGRES_URL,
  },
  tablesFilter: ['gallerysy_*'],
  verbose: true,
  strict: true,
} satisfies Config;
