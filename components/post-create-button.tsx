"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { cn, delay } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { createBrowserClient } from "@/lib/supabase/client"
import { toast } from "./ui/use-toast"
import createArticle from "@/actions/create-article"


interface PostCreateButtonProps extends ButtonProps { }

export function PostCreateButton({
    className,
    variant,
    ...props
}: PostCreateButtonProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    async function onClick() {
        setIsLoading(true);
        const res = await createArticle();
        if ("error" in res) {
            setIsLoading(false);
            return toast(
                {
                    title: "Data insertion",
                    description: "Article can't be created. Please try again!"
                }
            )
        }
        setIsLoading(false)
        router.push(`/editor/${res.id}`)
    }

    return (
        <button
            onClick={onClick}
            className={cn(
                buttonVariants({ variant }),
                {
                    "cursor-not-allowed opacity-60": isLoading,
                },
                className
            )}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <Icons.add className="mr-2 h-4 w-4" />
            )}
            New post
        </button>
    )
}

