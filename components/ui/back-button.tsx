"use client"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "./button"
import { Icons } from "../icons"
import { useRouter } from "next/navigation"

type BackButtonProps = {
    className?: string,
    text?: string
}

export default function BackButton({ className, text = "Go Back" }: BackButtonProps) {
    const router = useRouter();

    return <Button
        onClick={() => router.back()}
        className={cn(
            buttonVariants({ variant: "outline" }),
            "font-semibold"
            , className)}>
        <Icons.chevronLeft className="mr-2 h-4 w-4" />
        {text}
    </Button>

}
