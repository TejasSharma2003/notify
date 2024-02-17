"use client"

import { cn } from "@/lib/utils"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { newsCategories } from "@/config/category"
import Link from "next/link"
import { usePathname } from "next/navigation"

type CategoryProps = {
    currentOpenCategory: string
}

export default function Category({ currentOpenCategory }: CategoryProps) {
    const rightFade = "after:w-28 after:h-full after:bg-gradient-to-l after:from-white after:absolute after:top-0 after:right-0 after:z-10"
    const leftFade = ""
    const pathname = usePathname();

    const categoryShownInHome = pathname === "/";
    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className={cn("h-14 mb-10 sticky top-[81px] w-full container bg-white z-10 border-b flex items-center", leftFade, rightFade)}>
            <CarouselContent className="flex items-center">
                {newsCategories.map((category, index) => {
                    // TODO: maybe create a seperate component for diff redirect urls?
                    return (
                        <CarouselItem className="px-4 basis-auto flex items-center" key={index}>
                            {categoryShownInHome ?
                                <Link href={{
                                    pathname: '/',
                                    query: { category: category.toLowerCase() },
                                }}
                                    className={cn("relative text-muted-foreground hover:text-black py-[16px] after:scale-x-0 after:transition-all after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-primary after:duration-300", {
                                        "after:scale-x-1": category.toLowerCase() === currentOpenCategory
                                    })}>
                                    {category}
                                </Link>
                                :
                                <Link href={`/category/${category.toLowerCase()}`}
                                    className={cn("relative text-muted-foreground hover:text-black py-[16px] after:scale-x-0 after:transition-all after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-primary after:duration-300", {
                                        "after:scale-x-1": category.toLowerCase() === currentOpenCategory
                                    })}>
                                    {category}
                                </Link>
                            }
                        </CarouselItem>
                    )
                })}
            </CarouselContent>
            <CarouselPrevious className="z-50 left-0"/>
            <CarouselNext className="z-50 right-0"/>
        </Carousel >
    )
}
