"use server"

import { db } from "@/db"
import { articles } from "@/db/schema"
import { sql, and, eq } from "drizzle-orm"
import { delay } from "@/lib/utils"
import { ARTICLE_LIMIT_PER_PAGE } from "@/config/site"

type getSearchArticlesProps = {
    query: string,
    articleOffset: number
}

export default async function getSearchArticles({ query, articleOffset }: getSearchArticlesProps) {
    try {
        // await delay(4000);
        const res = await db.select()
            .from(articles)
            .limit(ARTICLE_LIMIT_PER_PAGE)
            .offset(articleOffset)
            .where(and(eq(articles.isPublished, true), sql`to_tsvector('english', ${articles.title})
        || to_tsvector('english', ${articles.description}) @@ plainto_tsquery('english', ${query})`))

        return {
            data: res
        }

    } catch (error) {
        console.log("Error in getSearchArticles", error);
        return {
            error: "Something bad has happeded. Please try again later!"
        }
    }
}
