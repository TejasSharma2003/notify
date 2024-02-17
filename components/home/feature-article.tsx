import { NUMBER_OF_FEATURED_ARTICLES, NUMBER_OF_SIDEARTICLES } from "@/config/site"
import { Database } from "@/types/supabase"
import { createServerClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import Link from "next/link"
import Image from "next/image"
import { v4 } from 'uuid'
import BottomArticleBar from "./bottom-article-bar"
import { getPublicImageUrl } from "@/actions/images/get-public-url"
import { Icons } from "../icons"
import { db } from "@/db"
import { articles } from "@/db/schema"
import { eq, and } from "drizzle-orm"
import { shimmer, toBase64 } from "@/lib/utils"
import { EmptyPlaceholder } from "../empty-placeholder"
import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

const SingleFeatureArticle = async ({ article }: { article: Article }) => {
    const imageUrl = article.coverImage?.startsWith('http') ? article.coverImage : `/articles/${article.coverImage}`
    return (
        <article className="font-sans max-w-[637px]">
            <div className="grid  grid-cols-[1fr_1.5fr] gap-y-2">
                <div className="ml-5">
                    <div className="relative">
                        <h3 className="my-2 text-base leading-6 line-clamp-1">{article.title}</h3>
                        <p className="line-clamp-2 text-gray-700 text-sm">{article.description}</p>
                        <Link href={`/news/${article.slug}`} className="absolute inset-0">
                            <span className="sr-only">View Article</span>
                        </Link>
                    </div>
                    <BottomArticleBar article={article} />
                </div>
                <div className="rounded overflow-hidden order-first">
                    <Image
                        src={imageUrl}
                        className="block hover:scale-110 transition-transform object-cover w-full h-full"
                        alt="cover-image"
                        width={204}
                        height={137}
                        placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(204, 137))}`}
                    />
                </div>
            </div>
        </article>
    )
}

const SingleMobileFeatureArticle = ({ article }: { article: Article }) => {
    const imageUrl = article.coverImage?.startsWith('http') ? article.coverImage : `/articles/${article.coverImage}`

    return <Card>
        <CardContent className="relative flex aspect-square p-0">
            <div className="absolute inset-0 rounded overflow-hidden order-first">
                <Image
                    src={imageUrl}
                    className="block hover:scale-110 transition-transform object-cover w-full h-full brightness-75"
                    alt="cover-image"
                    width={400}
                    height={137}
                    placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(204, 137))}`}
                />
            </div>
            <div className="z-10 flex items-end p-5">
                <div>
                    <h1 className="text-2xl text-white font-semibold line-clamp-1">{article.title}</h1>
                    <p className="line-clamp-2">{article.description}</p>
                </div>
            </div>
        </CardContent>
    </Card>

}

const MobileFeaturedSection = ({ articles }: { articles: Article[] }) => {
    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full mx-auto"
        >
            <CarouselContent>
                {articles.map((article) => {
                    return <CarouselItem key={v4()} className="sm:basis-1/2 md:basis-1/3">
                        <div className="p-1">
                            {<SingleMobileFeatureArticle article={article} />}
                        </div>
                    </CarouselItem>

                })}
            </CarouselContent>
        </Carousel>
    )
}


const FeatureArticle = async () => {
    const featuredArticles = await db.select()
        .from(articles)
        .where(and(eq(articles.isPublished, true), eq(articles.isFeatured, true)))

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
    return (
        <div>
            <div className="lg:hidden py-8">
                <h1 className="text-3xl font-heading mb-8">Featured Articles</h1>
                <MobileFeaturedSection articles={featuredArticles} />
            </div>
            <div className="hidden lg:block sticky top-[150px] max-h-[500px] overflow-x-hidden overflow-y-scroll max-w-lg">
                <h1 className="font-heading text-2xl mb-8">Featured articles</h1>
                <div className="grid gap-10">
                    {featuredArticles.map((article) => (
                        <SingleFeatureArticle key={v4()} article={article} />
                    ))}
                </div>
            </div>
        </div>
    )
}
export default FeatureArticle;
