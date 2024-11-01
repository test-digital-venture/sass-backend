import { integer, pgTable, varchar, boolean, text } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  first_name: varchar({ length: 255 }).notNull(),
  last_name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const postsTable = pgTable("posts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  slug: varchar({ length: 255 }).notNull().unique(),
  is_published: boolean().notNull().default(false),
  content: text().notNull(),
  user_id: integer()
    .notNull()
    .references(() => usersTable.id, {
      onDelete: "restrict",
      onUpdate: "cascade",
    }),
});
