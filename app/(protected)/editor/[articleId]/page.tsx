import React from "react";
import { notFound } from "next/navigation"
import NewEditor from "@/components/new-editor"
import { db } from "@/db";
import { articles } from "@/db/schema";
import { eq } from "drizzle-orm"


interface EditorPageProps {
    params: { articleId: string }
}

export default async function EditorPage({ params }: EditorPageProps) {
    const articleId = params.articleId;
    const [article] = await db.select().from(articles).where(eq(articles.id, articleId));
    if (!article) {
        notFound();
    }
    return <NewEditor article={article} />
}

