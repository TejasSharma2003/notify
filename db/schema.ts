import { pgTable, boolean, uuid, text, timestamp, integer, pgEnum } from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    name: text("name").unique(),
    createdAt: timestamp("created_at").defaultNow().notNull()
})

// TODO add user id to the table
export const articles = pgTable("articles", {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    title: text("title").notNull(),
    content: text("content"),
    description: text("description"),
    slug: text("slug").unique(),
    isPublished: boolean("is_published").default(false).notNull(),
    coverImage: text("cover_image").default(""),
    reads: integer("reads").default(0).notNull(),
    likes: integer("likes").default(0).notNull(),
    shares: integer("shares").default(0).notNull(),
    isFeatured: boolean("is_featured").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    category: text("category"),
    categoryId: uuid("category_id").references(() => categories.id)
})

export const userRoles = pgEnum('roles', ['user', 'author', 'admin']);
export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    userName: text("username").notNull(),
    password: text("password").notNull(),
    role: userRoles("roles").default("user").notNull(),
})

export type Article = typeof articles.$inferSelect; // return type when queried

