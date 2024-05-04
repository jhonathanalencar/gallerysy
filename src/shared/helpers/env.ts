import { z } from 'zod';

const envSchema = z.object({
  POSTGRES_URL: z.string().url(),
  USER_AVATAR_URL: z.string().url(),
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
});

export const env = envSchema.parse(process.env);
