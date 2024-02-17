import { getMinutes, shimmer, toBase64 } from "@/lib/utils";
import { createServerClient } from "@/lib/supabase/server";
import { ArchiveIcon, CalendarIcon, ClockIcon } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import { FC } from "react";
import { ReadTimeResults } from "reading-time";

async function getPublicImageUrl(authorId: string, fileName: string) {
    const cookieStore = cookies();
    const supabase = createServerClient(cookieStore);
    const bucketName =
        process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_POSTS || "cover-image";
    const { data } = supabase.storage
        .from(bucketName)
        .getPublicUrl(`${authorId}/${fileName}`);

    if (data && data.publicUrl) return data.publicUrl;

    return "/images/not-found.jpg";
}

interface DetailPostHeadingProps {
    id: string;
    title: string;
    cover_image: string;
    date: string;
    authorId: string
    readTime: ReadTimeResults;
}

const DetailArticleHeading: FC<DetailPostHeadingProps> = async ({
    id,
    title,
    cover_image,
    date,
    authorId,
    readTime,
}) => {
    return (
        <section className="flex flex-col items-start justify-between">
            <div className="relative w-full">
                <Image
                    src={await getPublicImageUrl(authorId, cover_image)}
                    alt={title}
                    width={512}
                    height={288}
                    className="h-[288px] w-full rounded-2xl bg-gray-100 object-cover"
                    placeholder={`data:image/svg+xml;base64,${toBase64(
                        shimmer(512, 288),
                    )}`}
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
            </div>
            <div className="w-full">
                <p className="my-5 overflow-hidden text-xl font-semibold leading-6 text-gray-900">
                    {title}
                </p>

                {/* Mobile view */}
                <div className="mb-5 grid grid-cols-2 gap-2 rounded-md border border-gray-100 px-3 py-2.5 text-gray-500 sm:hidden">
                    {/* Date */}
                    <div className="inline-flex space-x-2 border-gray-400 border-opacity-50">
                        <p className="mt-0.5">
                            <span className="sr-only">Date</span>
                            <CalendarIcon
                                className="h-4 w-4 text-gray-400"
                                aria-hidden="true"
                            />
                        </p>
                        <span className="text-sm">{date}</span>
                    </div>
                    {/* Category */}
                    {/* <div className="inline-flex space-x-2 border-gray-400 border-opacity-50"> */}
                    {/*     <p className="mt-0.5"> */}
                    {/*         <span className="sr-only">Category</span> */}
                    {/*         <ArchiveIcon */}
                    {/*             className="h-4 w-4 text-gray-400" */}
                    {/*             aria-hidden="true" */}
                    {/*         /> */}
                    {/*     </p> */}
                    {/* </div> */}

                    {/* Reading time */}
                    <div className="inline-flex space-x-2 border-gray-400 border-opacity-50">
                        <p className="mt-0.5">
                            <span className="sr-only">Minutes to read</span>
                            <ClockIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
                        </p>
                        <span className="text-sm">{getMinutes(readTime.minutes)}</span>
                    </div>
                </div>

                {/* Desktop view */}
                <div className="mb-7 hidden justify-start text-gray-500 sm:flex sm:flex-row">
                    {/* Author */}
                    {/* <div className="mb-5 flex flex-row items-start justify-start pr-3.5 md:mb-0"> */}
                    {/*     <Image */}
                    {/*         src={authorImage} */}
                    {/*         height={24} */}
                    {/*         width={24} */}
                    {/*         alt={authorName || "Avatar"} */}
                    {/*         className="flex h-[24px] w-[24px] rounded-full object-cover shadow-sm" */}
                    {/*         priority */}
                    {/*         placeholder="blur" */}
                    {/*         blurDataURL={shimmer(24, 24)} */}
                    {/*     /> */}
                    {/*     <div className="ml-2 flex flex-col"> */}
                    {/*         <span className="text-md flex font-semibold text-gray-900"> */}
                    {/*             {authorName} */}
                    {/*         </span> */}
                    {/*     </div> */}
                    {/* </div> */}
                    <div className="flex flex-row items-center">
                        {/* Date */}
                        <div className="flex space-x-2 border-gray-400 border-opacity-50 pl-0 pr-3.5 ">
                            <p className="mt-0.5">
                                <span className="sr-only">Date</span>
                                <CalendarIcon
                                    className="h-4 w-4 text-gray-400"
                                    aria-hidden="true"
                                />
                            </p>
                            <span className="text-sm">{date}</span>
                        </div>
                        {/* Category */}
                        {/* <div className="flex space-x-2 border-l border-gray-400 border-opacity-50 pl-3.5 pr-3.5"> */}
                        {/*     <p className="mt-0.5"> */}
                        {/*         <span className="sr-only">Category</span> */}
                        {/*         <ArchiveIcon */}
                        {/*             className="h-4 w-4 text-gray-400" */}
                        {/*             aria-hidden="true" */}
                        {/*         /> */}
                        {/*     </p> */}
                        {/*     <span className="text-sm">{category}</span> */}
                        {/* </div> */}
                        {/* Reading time */}
                        <div className="flex space-x-2 border-l border-gray-400 border-opacity-50 pl-3.5">
                            <p className="mt-0.5">
                                <span className="sr-only">Minutes to read</span>
                                <ClockIcon
                                    className="h-4 w-4 text-gray-400"
                                    aria-hidden="true"
                                />
                            </p>
                            <span className="text-sm">{getMinutes(readTime.minutes)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DetailArticleHeading;

