'use client'

import { Input } from "../ui/input"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from 'use-debounce';
import { Icons } from "../icons";

export default function SearchBar() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300)


    return (
        <div className="container flex items-center relative border-b">
            <Icons.search className="absolute left-0 w-5 h-5 text-muted-foreground ml-2" />
            <Input className="border-none pl-9 text-lg focus-visible:ring-0 py-6 " type="text" placeholder="Start typing to search..."
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get('query')?.toString()}
                maxLength={50}
            />
        </div>
    )
}

