import React from "react";
import { cn } from "@/lib/utils";

type LayoutWrapperProps = {
    children: React.ReactNode,
    className?: string
}

export default function LayoutWrapper({ children, className }: LayoutWrapperProps) {
    // TODO: provide an actual navbar height
    return <main className={cn("mt-[82px] pt-8", className)}>{children}</main>

}
