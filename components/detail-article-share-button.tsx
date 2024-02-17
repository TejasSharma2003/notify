'use client'

import { Button } from "./ui/button"
import { Icons } from "./icons"
import React from 'react'

import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { toast } from "./ui/use-toast"

interface DetailArticleShareButtonProps {
    title?: string;
    shares: number;
    description?: string | null;
    url?: string;
}


export default function DetailArticleShareButton({
    title = "",
    shares = 0,
    description = "",
    url = window.location.href,

}: DetailArticleShareButtonProps) {

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="ghost" className="flex justify-center">
                    <Icons.share />
                    <span className="ml-2">{shares}</span>
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="flex-1 rounded-t-[10px] bg-white p-4">
                    <div className="mx-auto max-w-md">
                        <div className="mx-auto my-6 grid grid-cols-3 justify-center gap-8">
                            <div className="mx-auto flex">
                                <a
                                    title={title}
                                    target="_blank"
                                    href={`https://twitter.com/intent/tweet?url=${url}&text=${encodeURIComponent(
                                        title,
                                    )}`}
                                    rel="noopener noreferrer"
                                    className="rounded-lg bg-[#1DA1F2] p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                                >
                                    <Icons.twitter className="h-8 w-8 text-gray-400 fill-white stroke-none" />
                                </a>
                            </div>
                            <div className="mx-auto flex ">
                                <a
                                    title={title}
                                    target="_blank"
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
                                    rel="noopener noreferrer"
                                    className="rounded-lg  bg-[#1877F2] p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                                >
                                    <Icons.facebook className="h-8 w-8 stroke-none fill-white" />
                                </a>
                            </div>
                            <div className="mx-auto flex ">
                                <a
                                    title={title}
                                    target="_blank"
                                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
                                    rel="noopener noreferrer"
                                    className="rounded-lg  bg-[#0A66C2] p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                                >
                                    <Icons.linkedin className="h-8 w-8 stroke-none fill-white" />
                                </a>
                            </div>

                            <div className="mx-auto flex ">
                                <a
                                    title={title}
                                    target="_blank"
                                    href={`mailto:?subject=${encodeURIComponent(
                                        title,
                                    )}&body=${encodeURIComponent(description + "\n\n")}${url}`}
                                    rel="noopener noreferrer"
                                    className="rounded-lg bg-[#D14836] p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                                >
                                    <Icons.mail className="h-8 w-8 stroke-[#D14836] fill-white" />
                                </a>
                            </div>

                            <div className="mx-auto flex ">
                                <CopyButton url={url} />
                            </div>
                        </div>
                    </div>
                </div>
            </DrawerContent>
        </Drawer >
    )
}
function CopyButton({ url }: { url: string }) {
    const [copied, setCopied] = React.useState(false);

    React.useEffect(() => {
        if (copied) {
            const id = setTimeout(() => setCopied(false), 2000);
            return () => clearTimeout(id);
        }
    }, [copied]);

    const copy = () => {
        setCopied(true);
        window.navigator.clipboard.writeText(url);
        toast({
            title: "Share the news",
            description: "Link copied to your clipboard"
        })
    };

    return (
        <button
            type="button"
            title="Copy url to clipboard"
            onClick={copy}
            className="rounded-lg border-[1.75px] border-gray-200  p-5  shadow-sm transition-all hover:-translate-y-1 hover:bg-transparent hover:shadow-md"
        >
            {copied ? (
                <Icons.check className="h-8 w-8 stroke-[1.5px] text-gray-400" />
            ) : (
                <Icons.link className="h-8 w-8 stroke-[1.5px] text-gray-400" />
            )}
        </button>
    );
};

