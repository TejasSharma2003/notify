"use server"

import { db } from "@/db"
import { articles } from "@/db/schema"
import { desc } from "drizzle-orm";

import { ARTICLE_LIMIT_PER_PAGE } from "@/config/site";

export default async function getDashboardArticles(dataOffset: number) {
    try {
        const allArticles = await db.select()
            .from(articles)
            .limit(ARTICLE_LIMIT_PER_PAGE)
            .offset(dataOffset)
            .orderBy(desc(articles.createdAt))
        return {
            data: allArticles
        };
    } catch (error) {
        console.log("Error in getDashboardArticles function", error);
        return {
            error: "Something bas has happened. Please try again later!"
        }
    }
}
