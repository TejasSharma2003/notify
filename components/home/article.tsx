import { ARTICLE_LIMIT_PER_PAGE } from "@/config/site";

import Link from "next/link";
import Image from "next/image"

import { db } from "@/db";
import { Article, articles } from "@/db/schema";
import { eq, desc, and } from "drizzle-orm"

import { v4 } from "uuid";

import { cn } from "@/lib/utils";
import { createImageUrl, formatDate, shimmer, toBase64 } from "@/lib/utils";

import { EmptyPlaceholder } from "../empty-placeholder";
import BottomArticleBar from "./bottom-article-bar";

export const SingleArticle = async ({ article }: { article: Article }) => {
    const imageUrl = `http://127.0.0.1/uploads/articles/${article.coverImage}`;
    return (
        <div className="font-sans border-b first:pt-0 pt-10 pb-10 last:border-none last:pb-0">
            <article className="">
                <div className="grid  grid-cols-[1.5fr_1fr] ">
                    <div className="relative flex-1 mr-6">
                        <span className="text-sm text-gray-500">
                            {formatDate(article.createdAt)}
                        </span>
                        <h1 className="mt-3 text-xl sm:text-2xl text-heading font-semibold font-heading leading-8 line-clamp-2 sm:line-clamp-3">{article.title}</h1>
                        <Link href={`/news/${article.slug}`} className="absolute inset-0">
                            <span className="sr-only">View Article</span>
                        </Link>
                    </div>
                    <div className="overflow-hidden rounded ml-auto">
                        <Image
                            src={imageUrl}
                            alt={article.coverImage || "cover"}
                            className="hover:scale-110 transition-transform w-[150px] h-[100px] sm:w-[256px] sm:h-[144px] object-cover duration-500"
                            width={256}
                            height={144}
                            quality={95}
                            priority
                            placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(256, 144))}`}
                        />
                    </div>
                </div>
                <div className="flex mt-4">
                    <div className="w-1 rounded bg-primary"></div>
                    <div className="ml-2">
                        <span className="text-sm font-semibold text-gray-800">Description</span>
                        <p className="text-base text-gray-700 line-clamp-2 sm:line-clamp-3">{article.description}</p>
                    </div>
                </div>
                <BottomArticleBar article={article} />
            </article>
        </div>
    )
}

type ArticleProps = {
    dataOffset: number,
    category?: string
    className?: string
}

const Article = async ({ dataOffset, category, className }: ArticleProps) => {
    let publishedArticles = [];
    if (category) {
        publishedArticles = await db.select()
            .from(articles)
            .limit(ARTICLE_LIMIT_PER_PAGE)
            .offset(dataOffset)
            .where(and(eq(articles.isPublished, true), eq(articles.category, category)))
            .orderBy(desc(articles.createdAt));
    } else {
        publishedArticles = await db.select()
            .from(articles)
            .limit(ARTICLE_LIMIT_PER_PAGE)
            .offset(dataOffset)
            .where(and(eq(articles.isPublished, true), eq(articles.isFeatured, false)))
            .orderBy(desc(articles.createdAt));
    }

    if (publishedArticles?.length === 0) {
        return (
            <EmptyPlaceholder>
                <EmptyPlaceholder.Icon name="post" className="stroke-muted-foreground" />
                <EmptyPlaceholder.Title className="">There are currently no articles to display.</EmptyPlaceholder.Title>
                <EmptyPlaceholder.Description>
                    Please check back later for updates
                </EmptyPlaceholder.Description>
            </EmptyPlaceholder>
        )
    }

    return (
        <div className={cn("grid lg:grid-cols-[0.8fr_auto] gap-x-14", className)}>
            <div className="flex flex-col w-full">
                {publishedArticles.map((article) => (
                    <SingleArticle key={v4()} article={article} />
                ))}
            </div>

            {/* This is for the adds */}
            <div className="min-w-52">
            </div>
        </div>
    )
}
export default Article
