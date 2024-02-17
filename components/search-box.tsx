'use client'

import { cn } from "@/lib/utils"
import { useSearchParams, useRouter } from "next/navigation"
import { Input } from "./ui/input"
import React, { useEffect } from "react"
import { Icons } from "./icons"
import { v4 } from "uuid"
import { buttonVariants } from "@/components/ui/button"
import { newsCategories } from "@/config/category"
import Link from "next/link"

type SingleSearchItemProps = {
    searchItem: string,
    loadSearch: (searchItem: string, jumpToSearch: boolean) => void,
    deleteSingleSearchItem: (item: string) => void
}

const SingleSearchItem = ({ loadSearch, searchItem, deleteSingleSearchItem }: SingleSearchItemProps) => {

    const onClick = () => {
        loadSearch(searchItem, true);
    }

    const onDelete = () => {
        deleteSingleSearchItem(searchItem);
    }
    return (
        <div className="py-2 cursor-pointer flex justify-between items-center">
            <span onClick={onClick}>{searchItem}</span>
            <Icons.close onClick={onDelete} className="stroke-muted-foreground w-4 h-4 hover:stroke-destructive" />
        </div>

    )
}


const SearchBox = () => {
    const searchParams = useSearchParams();
    const [url, setUrl] = React.useState('');
    const [recentSearches, setRecentSearches] = React.useState<string[]>([]);
    const [showRecentSearches, setShowRecentSearches] = React.useState(false);
    const router = useRouter();
    const [keyword, setKeyword] = React.useState("");

    useEffect(() => {
        const searches = localStorage.getItem("searches");
        if (searches) {
            setRecentSearches(JSON.parse(searches));
        }
    }, [])

    const loadSearch = (term: string, jumpToSearch = false) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        const newUrl = `?${params.toString()}`
        if (jumpToSearch) {
            return router.push(`/search/${newUrl}`);
        }
        setUrl(newUrl);
    }

    const onSearchHandler = (term: string) => {
        setShowRecentSearches(true);
        setKeyword(term);
        loadSearch(term);
    }

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        localStorage.setItem("searches", JSON.stringify([...recentSearches, keyword]))
        setKeyword("");
        router.push(`/search/${url}`);
    }

    const onClearSearches = () => {
        localStorage.setItem("searches", "");
        setRecentSearches([]);
    }

    const deleteSingleSearchItem = (item: string) => {
        setRecentSearches(pre => pre.filter(preItem => preItem != item));
        const localSearchList = localStorage.getItem("searches")
        if (localSearchList) {
            const oldSearchList: string[] = JSON.parse(localSearchList);
            const newSearchList = oldSearchList.filter(oldItem => oldItem != item);
            localStorage.setItem("searches", JSON.stringify(newSearchList));
            setRecentSearches(newSearchList);
        }
    }

    return (
        <div className="flex flex-col justify-center w-full font-sans">
            <form onSubmit={onSubmitHandler}>
                <div className=" font-sans flex items-center w-full relative py-2 px-4 border-b" >
                    <Icons.search className="text-muted-foreground absolute w-5 h-5 " />
                    <Input className="w-full border-none text-base bg-transparent pl-8 focus-visible:ring-0" type='name' placeholder="Start typing to search..." onClick={() => setShowRecentSearches(true)} onChange={(e) => onSearchHandler(e.target.value)} defaultValue={searchParams.get('query')?.toString()} />
                </div>
            </form>
            {showRecentSearches ?
                <div className="mt-2 p-4 pt-0 min-h-[300px] max-h-[300px] overflow-hidden overflow-y-scroll">
                    <div className="flex justify-between">
                        <h1 className="text-xl text-gray-800 mb-3 font-heading">Recent searches</h1>
                        {recentSearches.length > 0 && <button className={buttonVariants({ variant: "ghost" })} onClick={onClearSearches}>Clear all</button>}
                    </div>
                    {recentSearches.length === 0 && <p className="text-muted-foreground">Your searches would appear here.</p>}
                    {recentSearches.map((search) => (
                        <SingleSearchItem key={v4()}
                            loadSearch={loadSearch}
                            searchItem={search}
                            deleteSingleSearchItem={deleteSingleSearchItem}
                        />
                    ))}
                </div>
                :
                <div className="p-4">
                    <h1 className="text-xl text-gray-800 mb-3 font-heading">Explore some categories</h1>
                    <div className="flex flex-wrap gap-4">
                        {newsCategories.map((category, index) => {
                            return <Link href={`/category/${category.toLowerCase()}`} key={index} className=" text-sm text-muted-foreground border py-1 px-2 rounded-md hover:bg-accent hover:text-accent-foreground hover:cursor-pointer">
                                {category}
                            </Link>
                        })}
                    </div>
                </div>
            }
        </div>
    )
}

export default SearchBox;
