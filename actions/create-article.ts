"use server"

import { db } from "@/db"
import { articles } from "@/db/schema"

export default async function createArticle() {
    try {
        const [article] = await db.insert(articles)
            .values({
                title: "Untitled",
            }).returning()

        return article;

    } catch (err) {
        console.log("error in createArticle", err);
        return {
            error: "Something went wrong"
        }
    }
}
