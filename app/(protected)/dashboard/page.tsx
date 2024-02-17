import { ARTICLE_LIMIT_PER_PAGE } from "@/config/site"

import React from "react"

import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { PostCreateButton } from "@/components/post-create-button"
import { DashboardShell } from "@/components/shell"
import DashboardArticles from "@/components/dashboard-articles"
import Pagination from "@/components/pagination"

import { db } from "@/db"
import { articles } from "@/db/schema"
import { count } from "drizzle-orm"

export const metadata = {
    title: "Dashboard",
}

type DashboardPageProps = {
    searchParams: { [key: string]: string | string[] | undefined };
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
    const res = await db.select({ value: count() }).from(articles);
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
        <DashboardShell>
            <DashboardHeader heading="All the articles on the site" text="Create and manage your articles.">
                <PostCreateButton />
            </DashboardHeader>
            <div>
                {totalArticles ? (
                    <DashboardArticles dataOffset={dataOffset} />
                ) : (
                    <EmptyPlaceholder>
                        <EmptyPlaceholder.Icon name="post" className="stroke-muted-foreground" />
                        <EmptyPlaceholder.Title>Create articles and manage from here.</EmptyPlaceholder.Title>
                        <EmptyPlaceholder.Description>
                            You don&apos;t have any articles yet. Start creating content.
                        </EmptyPlaceholder.Description>
                        <PostCreateButton variant="outline" />
                    </EmptyPlaceholder>
                )}
            </div>
            {totalPages > 1 &&
                <div className="flex justify-center py-10">
                    <Pagination totalPages={totalPages} />
                </div>
            }
        </DashboardShell>
    )
}

