import {
  index,
  pgTableCreator,
  serial,
  text,
  timestamp,
  unique,
  varchar,
} from 'drizzle-orm/pg-core';

import { env } from '@shared/helpers/env';

export const createTable = pgTableCreator((name) => `gallerysy_${name}`);

export const user = createTable(
  'user',
  {
    userId: serial('user_id').primaryKey().notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    email: text('email').notNull().unique(),
    imageUrl: text('image_url').notNull().default(env.USER_AVATAR_URL),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => ({
    usernameIndex: index('user_name_idx').on(table.name),
    userNameKey: unique('user_name_key').on(table.name),
  })
);

export const image = createTable(
  'image',
  {
    imageId: serial('image_id').primaryKey().notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    imageUrl: text('image_url').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    userId: text('user_id').notNull(),
  },
  (table) => ({
    imageNameIndex: index('image_name_idx').on(table.name),
    imageNameKey: unique('image_name_key').on(table.name),
  })
);
