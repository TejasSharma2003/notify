import MainSkeletonArticle from "@/components/ui/article/skeletons/main-skeleton-article";
import { Suspense } from "react";
import Article from "@/components/home/article";
import { ARTICLE_LIMIT_PER_PAGE } from "@/config/site";
import { db } from "@/db";
import { articles } from "@/db/schema"
import { and, eq, count } from "drizzle-orm"
import { Separator } from "@/components/ui/separator"
import Category from "@/components/category";
import CategoryLoadingSkeleton from "@/components/ui/category-loading-skeleton";

type CategoryPageProps = {
    params: {
        category: string[];
    };
    searchParams: { [key: string]: string | string[] | undefined };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
    const category = params.category[0];
    const res = await db.select({ value: count() })
        .from(articles)
        .where(and(eq(articles.isPublished, true), eq(articles.category, category)))

    let totalArticles = res[0].value;

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
        <div className="container">
            <h1 className="pb-8 capitalize text-center text-5xl font-heading font-bold">{category}</h1>
            <Suspense fallback={<CategoryLoadingSkeleton/>}>
                <Category currentOpenCategory={category}/>
            </Suspense>
            <Suspense key={JSON.stringify({ params, searchParams })} fallback={<MainSkeletonArticle />}>
                <Article className="" dataOffset={dataOffset} category={category} />
            </Suspense>
        </div >
    )
}
