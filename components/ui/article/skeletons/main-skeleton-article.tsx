import { Skeleton } from "../../skeleton";

const SingleMainSkeletonArticle = () => {
    return (
        <div className="font-sans">
            <article>
                <div className="grid  grid-cols-[1.5fr_1fr] ">
                    <div className="relative flex-1 mr-6">
                        <span className="text-sm text-gray-500">
                            <Skeleton className="w-28 h-4" />
                        </span>
                        <Skeleton className="mt-3 w-96 h-8" />
                        <Skeleton className="mt-3 w-72 h-8" />
                        <div className="absolute inset-0">
                            <span className="sr-only">View Article</span>
                        </div>
                    </div>
                    <div className="overflow-hidden rounded ml-auto">
                        <Skeleton className="w-[256px] h-[144px]" />
                    </div>
                </div>
                <div className="flex flex-col mt-4">
                    <Skeleton className="w-28 h-4" />
                    <Skeleton className="w-full h-4 mt-3" />
                    <Skeleton className="w-4/5 h-4 mt-3" />
                    <Skeleton className="w-3/4 h-4 mt-3" />
                </div>
                <div className="mt-4 flex justify-between items-center">
                    <Skeleton className="w-20 h-4" />
                    <Skeleton className="w-20 h-8" />
                </div>
            </article>
            <div className="my-8 h-[0.8px]"></div>
        </div>
    );
};

type MainSkeletonArticleProps = {
    className?: string
}

const MainSkeletonArticle = ({ className }: MainSkeletonArticleProps) => {
    return (
        <div className="grid grid-cols-[0.8fr_auto] gap-x-14">
            <div className="flex flex-col w-full">
                <SingleMainSkeletonArticle />
                <SingleMainSkeletonArticle />
                <SingleMainSkeletonArticle />
                <SingleMainSkeletonArticle />
            </div>
            <div className="min-w-52"></div>
        </div>
    );
};

export default MainSkeletonArticle;;

