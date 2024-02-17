import React from 'react'
import { ArticleItem } from "./article-item"
import getDashboardArticles from '@/actions/get-dashboard-articles'

export default async function DashboardArticles({ dataOffset }: { dataOffset: number }) {
    const articles = await getDashboardArticles(dataOffset);

    if (!articles.data) {
        return <h1>Something bad has happend</h1>
    }

    return (
        <div className="divide-y divide-border rounded-md border" >
            {articles.data.map((article) => (
                <ArticleItem key={article.id} article={article} />
            ))}
        </div >
    )
}
