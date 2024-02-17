"use client"

import Link from "next/link"

import { Skeleton } from "@/components/ui/skeleton"
import { ArticleOperations } from "@/components/article-operations"
import { formatDate } from "@/lib/utils"
import { Separator } from "./ui/separator"

export function ArticleItem({ article }: { article: Article }) {
    return (
        <div className="flex items-center justify-between p-4">
            <div className="grid gap-1">
                <Link
                    href={`/editor/${article.id}`}
                    className="line-clamp-2 font-semibold hover:underline"
                >
                    {article.title}
                </Link>
                <div>
                    <p className="text-sm text-muted-foreground">
                        {formatDate(article.createdAt)}
                    </p>
                </div>
            </div>
            <div className="flex ml-2 sm:ml-0">
                <div className="flex gap-y-2">
                    {article.isFeatured &&
                        <div className="rounded text-sm py-1 px-2 ml-auto mr-4 border text-muted-foreground border-input bg-background hover:bg-accent hover:text-accent-foreground">
                            <span>Featured</span>
                        </div>
                    }
                    {article.isPublished &&
                        <div className="rounded text-sm py-1 px-2 ml-auto mr-4 border text-muted-foreground border-input bg-background hover:bg-accent hover:text-accent-foreground">
                            <span>Published</span>
                        </div>
                    }
                </div>
                <ArticleOperations articleId={article.id} isPublished={article.isPublished} isFeatured={article.isFeatured} />
            </div>
        </div>
    )
}

