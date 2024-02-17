import { Skeleton } from "../../skeleton";

const SingleFeatureArticleSkeleton = () => {
    return (
        <div className="flex flex-col gap-3">
            <Skeleton className="w-20 h-5" />
            <Skeleton className="w-56 h-8" />
            <Skeleton className="w-72 h-3" />
            <Skeleton className="w-72 h-3" />
            <Skeleton className="w-72 h-3" />
        </div>
    )

}

export default function FeatureArticleSkeleton() {
    return <div className="px-24">
        <div className="flex gap-x-20 py-5 px-24 pb-8">
            <SingleFeatureArticleSkeleton />
            <SingleFeatureArticleSkeleton />
            <SingleFeatureArticleSkeleton />
            <SingleFeatureArticleSkeleton />
        </div>
    </div>
}
