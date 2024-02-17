import Link from "next/link"
import { v4 } from 'uuid'
import { db } from "@/db"
import { Article, articles } from "@/db/schema"
import { eq, and, desc } from "drizzle-orm"
import { delay, formatDate } from "@/lib/utils"
import { EmptyPlaceholder } from "./empty-placeholder"
import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Separator } from "./ui/separator"

const SingleFeatureArticle = ({ article }: { article: Article }) => {
    return (
        <Card className="relative after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-1/2 after:w-[2px] after:bg-muted rounded-none shadow-none">
            <CardContent className="relative flex p-0">
                <div className="z-10 flex items-end p-5">
                    <div>
                        <span className="text-xs text-gray-500">{formatDate(article.createdAt)}</span>
                        <h1 className="text-lg text-heading font-heading font-semibold line-clamp-2 tracking-[.5px]">{article.title}</h1>
                        <p className="text-muted-foreground line-clamp-3 text-sm mt-2">{article.description}</p>
                    </div>
                </div>
                <Link href={`/news/${article.slug}`} className="absolute inset-0 z-20">
                    <span className="sr-only">View Article</span>
                </Link>
            </CardContent>
        </Card>
    )
}

const FeatureArticleCarousel = ({ articles }: { articles: Article[] }) => {
    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full mx-auto after:w-28 after:h-full after:bg-gradient-to-l after:from-white after:absolute after:top-0 after:right-0 after:z-10"
        >
            <CarouselContent>
                {articles.map((article) => (
                    <CarouselItem key={v4()} className="sm:basis-1/2 md:basis-1/3">
                        <SingleFeatureArticle article={article} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselNext className="w-10 h-10 -right-14" />
            <CarouselPrevious className="w-10 h-10 -left-14" />
        </Carousel>
    )
}

export default async function FeatureArticle() {
    const featuredArticles = await db.select()
        .from(articles)
        .where(and(eq(articles.isPublished, true), eq(articles.isFeatured, true)))
        .orderBy(desc(articles.createdAt))

    if (featuredArticles.length == 0) {
        return (
            <EmptyPlaceholder className="mt-10">
                <EmptyPlaceholder.Icon name="post" className="stroke-muted-foreground" />
                <EmptyPlaceholder.Title className="">There are currently no featured articles to display.</EmptyPlaceholder.Title>
                <EmptyPlaceholder.Description>
                    Please check back later for updates
                </EmptyPlaceholder.Description>
            </EmptyPlaceholder>
        )
    }
    return <div className="px-24 pb-8">
        <FeatureArticleCarousel articles={featuredArticles} />
    </div>
}
