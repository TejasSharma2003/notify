"use server"
import { db } from "@/db"
import { articles } from "@/db/schema"
import { sql } from "drizzle-orm"
import { revalidatePath } from "next/cache"

type unlikeArticleProps = {
    articleId: string
}
export default async function unlikeArticle({ articleId }: unlikeArticleProps) {
    try {
        await db.execute(sql`
            update articles
            set likes = ${articles.likes} - 1
            where id = ${articleId}
        `);
    } catch (error) {
        console.log("unlikeArticle", error);
        return {
            error: "Something went wrong"
        }
    } finally {
        revalidatePath("/")
    }
}

