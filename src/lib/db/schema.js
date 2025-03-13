import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const gists = sqliteTable('gists', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  url: text('url').notNull().unique(),
  title: text('title').notNull(),
  category: text('category').notNull(),
  upvotes: integer('upvotes').default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(new Date())
});