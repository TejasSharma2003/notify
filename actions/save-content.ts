"use server"
import { db } from "@/db"
import { articles }  from "@/db/schema"
import { eq } from "drizzle-orm";

type saveContentProps = {
    content: string,
    articleId: string
}
export default async function saveContent({ content, articleId }: saveContentProps) {
    try {
        const res = await db.update(articles)
        .set({ content })
        .where(eq(articles.id, articleId))
        return true;
    } catch(error) {
        console.log("Error on saveContent", error);
        return false
    }

}
