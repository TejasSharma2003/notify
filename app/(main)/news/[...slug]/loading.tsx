import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <article className="container relative max-w-3xl py-6 lg:py-10">
            <Skeleton className="w-40 h-10 absolute left-[-200px] top-14 hidden xl:inline-flex" />
            <div>
                <time
                    className="block text-sm text-muted-foreground" >
                    <Skeleton className="w-40 h-10" />
                </time>
                <h1 className="mt-2 inline-block font-heading text-4xl leading-tight w-full">
                    <Skeleton className="w-full h-8 my-2" />
                    <Skeleton className="w-2/4 h-8 my-2 " />
                </h1>
            </div>
            <Skeleton className="w-[720px] h-[405px]" />
            <Skeleton className="w-full h-3 mb-3 mt-8" />
            <Skeleton className="w-5/6 h-3 mb-3 " />
            <Skeleton className="w-3/4 h-3 mb-3 " />
            <Skeleton className="w-2/3 h-3 mb-3 " />
            <Skeleton className="w-1/2 h-3 mb-3 " />
            <hr className="mt-12" />
        </article>
    )
}
