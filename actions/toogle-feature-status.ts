"use server"
import { db } from "@/db"
import { articles } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

type toogleFeatureStatusProps = {
    articleId: string,
    isFeatured: boolean
}
export default async function toogleFeatureStatus({ articleId, isFeatured }: toogleFeatureStatusProps) {
    try {
        // check if the article already featured
        const res = await db.select({ isFeatured: articles.isFeatured })
            .from(articles)
            .where(eq(articles.id, articleId))
        const article = res[0];
        if (article.isFeatured) {
            // remove article as featured article
            await db.update(articles)
                .set({ isFeatured: false })
                .where(eq(articles.id, articleId))
            return {
                message: "This article is no longer in the featured section"
            }
        }

        // set the article as featured article
        await db.update(articles)
            .set({ isFeatured: true })
            .where(eq(articles.id, articleId))
        return {
            message: "Article has been marked as featured. Please make sure you publish the article also."
        }
    } catch (error) {
        return {
            error: "Can't feature this article. Please try again later!"
        }

    } finally {
        revalidatePath("/dashboard");
    }
}
