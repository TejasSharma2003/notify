import { ARTICLE_LIMIT_PER_PAGE } from "@/config/site";

import { Suspense } from "react";

import { and, count, eq } from "drizzle-orm"
import { db } from "@/db"
import { articles } from "@/db/schema";

import Article from "@/components/home/article";
import MainSkeletonArticle from "@/components/ui/article/skeletons/main-skeleton-article";
import Pagination from "@/components/pagination";
import FeatureArticle from "@/components/feature-article";
import FeatureArticleSkeleton from "@/components/ui/article/skeletons/feature-article-skeleton";
import CategoryServer from "@/components/category-server";
import CategoryLoadingSkeleton from "@/components/ui/category-loading-skeleton";

type HomePageProps = {
    searchParams: { [key: string]: string | string[] | undefined };
}

export default async function HomePage({ searchParams }: HomePageProps) {

    // Fetching total rows
    let queryWithCategory = false;
    let res = [];
    let category = "";
    if (searchParams.category && typeof searchParams.category === "string") {
        queryWithCategory = true;
        category = searchParams.category;
        res = await db.select({ value: count() })
            .from(articles)
            .where(and(eq(articles.isPublished, true), eq(articles.category, category)));

    } else {
        res = await db.select({ value: count() })
            .from(articles)
            .where(and(eq(articles.isPublished, true), eq(articles.isFeatured, false)));
    }

    const totalArticles = res[0].value;

    // Pagination
    const limit = ARTICLE_LIMIT_PER_PAGE;
    const totalPages = totalArticles ? Math.ceil(totalArticles / limit) : 0;
    const page =
        typeof searchParams.page === "string" &&
            +searchParams.page > 1 &&
            +searchParams.page <= totalPages
            ? +searchParams.page
            : 1;

    const dataOffset = page == 1 ? 0 : (page - 1) * limit;

    return (
        <>
            {!queryWithCategory &&
                <>
                    <h1 className="text-[1.7rem] text-center font-bold font-heading text-black mb-7">Your recent are update&apos;s here</h1>
                    <Suspense fallback={<FeatureArticleSkeleton />}>
                        <FeatureArticle />
                    </Suspense>
                </>
            }
            <Suspense fallback={<CategoryLoadingSkeleton/>}>
                <CategoryServer category={category} />
            </Suspense>
            <div className="container">
                {!queryWithCategory && <h1 className="mb-10 text-[1.7rem] text-heading underline-offset-4 font-heading">Here&apos;s what&apos;s trending...</h1>}
                <Suspense key={JSON.stringify(searchParams)} fallback={<MainSkeletonArticle />}>
                    <Article dataOffset={dataOffset} category={category} />
                </Suspense>
            </div>
            {totalPages > 1 && (
                <div className="flex justify-center py-10">
                    <Pagination totalPages={totalPages} />
                </div>
            )}
        </>
    )
}
