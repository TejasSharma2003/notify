"use server"
import { db } from "@/db"
import { articles } from "@/db/schema"
import { eq } from "drizzle-orm"

export default async function deleteArticle(articleId: string) {
    try {
        await db.delete(articles).where(eq(articles.id, articleId));
        return {
            message: "The article has been deleted succesfully"
        }
    } catch (err) {
        console.log("Error deleting article", err);
        return {
            error: "Can't delete the article. Please try again later."
        }
    }
}
