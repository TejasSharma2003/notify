"use server"
import { db } from "@/db"
import { articles } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache";

export default async function publishArticle(articleId: string) {
    try {
        // check if the article already publised if yes then return right away
        const result = await db.select({
            isPublished: articles.isPublished
        })
            .from(articles)
            .where(eq(articles.id, articleId));

        const article = result[0];
        if (article.isPublished) return;

        // else mark the article as published
        await db.update(articles)
            .set({ isPublished: true })
            .where(eq(articles.id, articleId))

    } catch (err) {
        return {
            error: "Can't publish the article. Please try again later"
        }
    } finally {
        revalidatePath("/dashboard");
    }
}
