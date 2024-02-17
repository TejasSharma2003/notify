import { Skeleton } from "../../skeleton";

const SideArticleItemDesktopLoading = () => {
    return (
        <div
            role="status"
            className="  sticky top-0 self-start    hidden max-w-[512px] flex-col items-center justify-center space-y-8 md:flex" >
            <div className="mx-auto max-w-3xl w-full animate-pulse rounded-md dark:border-gray-700">
                <div className="flex flex-row-reverse">
                    <div className="mt-4 flex flex-col ml-5 ">
                        {/* <div className="mb-4 h-3 bg-gray-200 rounded-full w-20"></div> */}
                        <div className="mb-2.5 h-3 w-[273px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
                        <div className="mb-2.5 h-3 w-[273px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
                        <div className="mt-4 mb-2.5 h-3 w-[273px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
                        <div className="mb-2.5 h-3 w-[273px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
                        <div className="flex justify-between mt-auto">
                            <div className="mb-4 h-3 bg-gray-200 rounded-full w-20"></div>
                            <div className="mb-4 h-3 bg-gray-200 rounded-full w-20"></div>
                        </div>
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div className="mt-4  flex-1 flex h-[137px] w-[204px] items-center justify-center rounded bg-gray-300 dark:bg-gray-700">
                        <svg
                            className="h-10 w-10 text-gray-200 dark:text-gray-600"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 16 20"
                        >
                            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                        </svg>
                    </div>
                </div>

            </div>
        </div>
    );
};


export default function SideSkeletonArticle() {
    return (
        <div className="sticky top-[150px] self-start max-w-lg">
            <div className="grid gap-10">
                <Skeleton className="w-40 h-8" />
                <SideArticleItemDesktopLoading />
                <SideArticleItemDesktopLoading />
                <SideArticleItemDesktopLoading />
            </div>
        </div>

    )
}



