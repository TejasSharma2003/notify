"use client"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import SideNavbar from "./side-navbar"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export default function Menu() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        if (isOpen) {
            setIsOpen(false);
        }
    }, [pathname])

    return (
        <Sheet open={isOpen}>
            <SheetTrigger className="relative w-[25px] h-[20px] overflow-hidden" onClick={() => setIsOpen(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
            </SheetTrigger>
            <SheetContent className="rounded-r-lg" side="left" onCloseSheet={() => setIsOpen(false)}>
                <SideNavbar />
            </SheetContent>
        </Sheet>
    )
}
