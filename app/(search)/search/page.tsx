import MainSkeletonArticle from "@/components/ui/article/skeletons/main-skeleton-article";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import SearchedArticle from "@/components/searched-article";
import SearchBar from "@/components/search-page/search-bar";

function SearchPageArticleSkeletonWrapper() {
    return (
        <div className="container grid lg:grid-cols-[0.8fr_auto] gap-x-14">
            <div>
                <Skeleton className="mt-8 w-64 h-10 mb-8" />
                <MainSkeletonArticle className="mt-8" />
            </div>
        </div>
    )
}

export default async function QueryResultPage({ searchParams }: {
    searchParams?: {
        query?: string
    }
}) {
    const query = searchParams?.query || '';
    return (
        <>
            <SearchBar />
            <Suspense key={JSON.stringify(searchParams)} fallback={<SearchPageArticleSkeletonWrapper />}>
                <SearchedArticle query={query} />
            </Suspense>
        </>
    )
}
