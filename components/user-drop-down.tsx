"use client"

import { cn } from "@/lib/utils"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { toast } from "./ui/use-toast"
import { Button, buttonVariants } from "./ui/button"

export default function UserDropDown() {
    const { authUser } = useAuth();
    const router = useRouter();

    const handleSignOut = async () => {
        const res = await fetch("/api/logout");
        const { success } = await res.json();
        if (!success) {
            return toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
                variant: "destructive"
            })
        }
        router.refresh();
    }

    const firstLetter = authUser?.userName.split('')[0].toUpperCase();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    {/* <AvatarImage src="" /> */}
                    <AvatarFallback className="bg-primary text-white">{firstLetter}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>
                    {authUser?.userName}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link href="/dashboard">
                        Dashboard
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="/dashboard/settings">
                        Settings
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
                    Signout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
