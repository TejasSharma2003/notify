import React from "react"
import Navbar from "@/components/navbar"
import { cookies } from "next/headers"
import LayoutWrapper from "@/components/layout-wrapper";
import Footer from "@/components/footer";

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = cookies();
    const isAuthenticated = !!cookieStore.get('user');

    return (
        <>
            <Navbar isAuthenticated={isAuthenticated} />
            <LayoutWrapper>
                {children}
            </LayoutWrapper>
            <Footer />
        </>
    )
}
