import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { cookies } from "next/headers"

import { createServerClient } from "@/lib/supabase/server"
import { cn, createImageUrl, delay, formatDate } from "@/lib/utils"

import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import Content from "@/components/content"
import { getPublicImageUrl } from "@/actions/images/get-public-url"
import { Database } from "@/types/supabase"
import { db } from "@/db"
import { articles } from "@/db/schema"
import { eq, and, sql } from "drizzle-orm"
import BackButton from "@/components/ui/back-button"
import ScrollUp from "@/components/scroll-up"
import { Separator } from "@/components/ui/separator"

interface PostPageProps {
    params: {
        slug: string[]
    }
}

async function getArticle(slug: string) {
    const result = await db.select()
        .from(articles)
        .where(and(eq(articles.slug, slug), eq(articles.isPublished, true)));
    if (!result.length) {
        return null;
    }
    const article = result[0];
    return article;
}


async function updateReadingCount(slug: string) {
    try {
        await db.update(articles)
            .set({ reads: sql`${articles.reads} + 1` })
            .where(eq(articles.slug, slug));
        return null;
    } catch (error) {
        return error;
    }
}

export default async function PostPage({ params }: PostPageProps) {
    const slug = params?.slug?.join("");
    // fetching the article
    const articleData = getArticle(slug);
    const updateCount = updateReadingCount(slug);

    const [article, _] = await Promise.all([articleData, updateCount])

    if (!article) {
        notFound()
    }

    // const imageUrl = `http://127.0.0.1/uploads/articles/${article.coverImage}`;
    const imageUrl = `/articles/${article.coverImage}`;
    return (
        <article className="container relative max-w-3xl">
            <BackButton className="absolute left-[-200px] top-0 hidden xl:inline-flex " />
            <div>
                <time
                    className="block text-sm text-muted-foreground" >
                    Published on {formatDate(article.createdAt)}
                </time>
                <h1 className="mt-2 inline-block font-bold font-heading text-4xl leading-tight text-heading">
                    {article.title}
                </h1>
            </div>
            <Image
                src={imageUrl}
                alt={article.title}
                width={720}
                height={405}
                className="my-8 rounded-md border bg-muted transition-colors"
                priority
            />
            <Content content={article.content || ""} />
            <hr className="mt-12" />
            <div className="flex justify-center py-6 lg:py-10">
                <BackButton />
            </div>
            <ScrollUp />
        </article>
    )
}

