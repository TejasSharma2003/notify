import getSearchArticles from "@/actions/get-search-articles"
import FilterArticle from "./search-page/filter-article";

export default async function SearchedArticle({ query }: { query: string }) {
    const res = await getSearchArticles({ query, articleOffset: 0 });
    if (res.error) {
        return <h1>Error occurent in SearchedArticle</h1>
    }
    return <FilterArticle query={query} articles={res.data || []} />
}
