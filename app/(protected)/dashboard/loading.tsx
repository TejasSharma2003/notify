import { DashboardHeader } from "@/components/header"
import { PostCreateButton } from "@/components/post-create-button"
import { DashboardShell } from "@/components/shell"
import { Skeleton } from "@/components/ui/skeleton"

const ArticleItemSkeleton = function ArticleItemSkeleton() {
    return (
        <div className="p-4">
            <div className="space-y-3">
                <Skeleton className="h-5 w-2/5" />
                <Skeleton className="h-4 w-4/5" />
            </div>
        </div>
    )
}

export default function DashboardLoading() {
    return (
        <DashboardShell>
            <DashboardHeader heading="Articles" text="Create and manage your articles.">
                <PostCreateButton />
            </DashboardHeader>
            <div className="divide-border-200 divide-y rounded-md border">
                <ArticleItemSkeleton />
                <ArticleItemSkeleton />
                <ArticleItemSkeleton />
                <ArticleItemSkeleton />
                <ArticleItemSkeleton />
            </div>
        </DashboardShell>
    )
}

