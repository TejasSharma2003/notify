"use client"

import getSearchArticles from "@/actions/get-search-articles";
import React, { useEffect } from "react";
import SearchBar from "./search-bar";
import { toast } from "../ui/use-toast";
import { ARTICLE_LIMIT_PER_PAGE } from "@/config/site";
import SearchArticleNotFound from "../ui/article/skeletons/search-article-not-found";
import { useInView } from "react-intersection-observer"
import { formatDate, toBase64, shimmer, createImageUrl } from "@/lib/utils";
import Link from "next/link";
import { Separator } from "@/components/ui/separator"

import Image from "next/image";
import { v4 } from "uuid";
import ScrollUp from "../scroll-up";
import { Article } from "@/db/schema";


function SingleSearchedArticle({ article }: { article: Article }) {
    return (
        <article className="w-full first:pt-0 py-8 border-b last:border-none">
            <div className="grid  grid-cols-[1.5fr_1fr] ">
                <div className="relative flex-1 mr-6">
                    <span className="text-sm text-gray-500">
                        {formatDate(article.createdAt)}
                    </span>
                    <h3 className="mt-3 text-2xl text-gray-700 font-semibold leading-8 line-clamp-3">{article.title}</h3>
                    <Link href={`/news/${article.slug}`} className="absolute inset-0">
                        <span className="sr-only">View Article</span>
                    </Link>
                </div>
                <div className="overflow-hidden rounded ml-auto">
                    <Image
                        src={article.coverImage ? createImageUrl(article.coverImage) : ""}
                        alt={article.coverImage || "cover"}
                        className="hover:scale-110 transition-transform w-[256px] h-[144px] object-cover duration-500"
                        width={256}
                        height={144}
                        priority
                        placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(256, 144))}`}
                    />
                </div>
            </div>
            <div className="flex mt-4">
                <div className="w-1 rounded bg-primary"></div>
                <div className="ml-2">
                    <span className="text-sm font-semibold text-gray-800">Description</span>
                    <p className="text-base text-gray-700 line-clamp-3">{article.description}</p>
                </div>
            </div>
        </article>
    )
}

export default function FilterArticle({ query, articles }: { query: string, articles: Article[] }) {
    const [isSearching, setIsSearching] = React.useState(false);
    const [data, setData] = React.useState(articles);
    const [offset, setOffset] = React.useState(10);
    const [isListComplete, setIsListComplete] = React.useState(false);
    const { ref, inView } = useInView();

    useEffect(() => {
        setIsListComplete(false)
        setData(articles)
    }, [articles])


    const loadMoreArticles = async () => {
        const res = await getSearchArticles({ query, articleOffset: offset });
        if (res.data?.length === 0) {
            setIsListComplete(true);
        }

        if (res.error) {
            return toast({
                variant: "destructive",
                description: res.error
            })
        };

        // @ts-ignore
        setData(pre => [...pre, ...res.data])
        setOffset(pre => pre + ARTICLE_LIMIT_PER_PAGE);
    }

    useEffect(() => {
        if (inView) {
            loadMoreArticles();
        }
    }, [inView])

    return (
        <div className="container grid grid-cols-[0.8fr_auto] gap-x-14">
            <div>
                <div className="mt-8">
                    {query && <h1 className="font-heading text-3xl text-black/50 mb-4">Result for <span className="text-black">{query}</span></h1>}
                    {query && articles.length === 0 && <SearchArticleNotFound />}
                    {query && articles.length > 0 && (
                        <div>
                            <div className="flex flex-col items-center py-10">
                                {data.map((article) => <SingleSearchedArticle key={v4()} article={article} />)}
                            </div>
                            {data.length >= ARTICLE_LIMIT_PER_PAGE && !isListComplete &&
                                <div className="flex justify-center py-10">
                                    <span ref={ref}>
                                        <svg aria-hidden="true" className="w-7 h-7 text-gray-200 animate-spin dark:text-gray-600 fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                        <span className="sr-only">Loading...</span>
                                    </span>
                                </div>
                            }
                        </div>
                    )}
                </div>
            </div>
            <div className="min-w-52">
            </div>
            <ScrollUp />
        </div>
    );
}

