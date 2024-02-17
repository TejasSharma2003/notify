"use server"

import { db } from "@/db"
import { articles, categories } from "@/db/schema"
import { articleEditFormSchema } from "@/lib/validations/article"
import { warn } from "console"
import { eq } from "drizzle-orm"
import { ZodError, z } from "zod"

const updateArticleSchema = z.object({ id: z.string() }).merge(articleEditFormSchema);
type updateArticleProps = z.infer<typeof updateArticleSchema>

export default async function updateArticle(ctx: updateArticleProps) {
    try {
        // check if the category exists
        const data = updateArticleSchema.parse(ctx);
        const res = await db.select()
            .from(categories)
            .where(eq(categories.name, ctx.category))

        const category = res[0];
        if (!category) {
            return {
                success: false,
                message: "Category doesn't exists. Please try different category"
            }
        }
        await db.update(articles).set({
            title: data.title,
            content: data.content,
            description: data.description,
            slug: data.slug,
            category: data.category,
            categoryId: category.id
        }).where(eq(articles.id, data.id))

    } catch (error: any) {
        let message = "Something went wrong"
        if ("code" in error && error.code === "23505") {
            message = "Slug already exists. Please give different slug for your article."
        }
        if (error instanceof ZodError) {
            message = error.message
        }
        return {
            success: false,
            message
        }
    }
}

