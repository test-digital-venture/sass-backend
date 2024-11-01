import {
  integer,
  pgTable,
  varchar,
  boolean,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

// columns.helpers.ts
const timestamps = {
  updated_at: timestamp(),
  created_at: timestamp().defaultNow().notNull(),
  deleted_at: timestamp(),
};

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  first_name: varchar({ length: 255 }).notNull(),
  last_name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  ...timestamps,
});

export const postsTable = pgTable("posts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  slug: varchar({ length: 255 }).notNull().unique(),
  is_published: boolean().notNull().default(false),
  content: text().notNull(),
  can_comment: boolean().notNull().default(true),
  user_id: integer()
    .notNull()
    .references(() => usersTable.id, {
      onDelete: "restrict",
      onUpdate: "cascade",
    }),
  ...timestamps,
});

export const commentsTable = pgTable("comments", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  content: text().notNull(),
  post_id: integer()
    .notNull()
    .references(() => postsTable.id, {
      onDelete: "restrict",
      onUpdate: "cascade",
    }),
  user_id: integer()
    .notNull()
    .references(() => usersTable.id, {
      onDelete: "restrict",
      onUpdate: "cascade",
    }),
  ...timestamps,
});
