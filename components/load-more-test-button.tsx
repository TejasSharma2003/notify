"use client"

import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function LoadMoreTestButton() {
    const { replace } = useRouter();
    const pathname = usePathname();

    const loadMoreArticles = async () => {
        const str = "query=lorem"
        replace(`${pathname}?${str}`);
    }

    return <Button onClick={loadMoreArticles}>Load more.</Button>

}
