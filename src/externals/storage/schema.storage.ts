import {
  index,
  pgTableCreator,
  serial,
  text,
  timestamp,
  unique,
  varchar,
} from 'drizzle-orm/pg-core';

import { DEFAULT_USER_PROFILE_URL } from '@shared/constants/user.constant';

export const createTable = pgTableCreator((name) => `gallerysy_${name}`);

export const user = createTable(
  'user',
  {
    userId: text('user_id').primaryKey().notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    email: text('email').notNull().unique(),
    imageUrl: text('image_url').notNull().default(DEFAULT_USER_PROFILE_URL),
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
    userId: text('user_id')
      .notNull()
      .references(() => user.userId, {
        onDelete: 'cascade',
      }),
  },
  (table) => ({
    imageNameIndex: index('image_name_idx').on(table.name),
    imageNameKey: unique('image_name_key').on(table.name),
  })
);
