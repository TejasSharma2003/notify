"use server"
import { db } from "@/db"
import { articles } from "@/db/schema"
import { sql, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

type LikeToggleProps = {
    articleId: string
}
export default async function likeArticle({ articleId }: LikeToggleProps) {
    try {
        await db.execute(sql`
            update articles
            set likes = ${articles.likes} + 1
            where id = ${articleId}
        `);
    } catch (error) {
        console.log("likeArticle", error);
        return {
            error: "Something went wrong"
        }
    } finally {
        revalidatePath("/");
    }
}
