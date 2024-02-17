import LayoutWrapper from "@/components/layout-wrapper"
import Navbar from "@/components/navbar"
import { isUserAuthenticated } from "@/lib/server/auth"
import React from "react"

type SearchLayoutProps = {
    children: React.ReactNode
}
export default async function SearchLayout({ children }: SearchLayoutProps) {
    const isAuthenticated = isUserAuthenticated();
    return (
        <>
            <Navbar isAuthenticated={isAuthenticated} />
            <LayoutWrapper>
                {children}
            </LayoutWrapper>
        </>
    )
}
