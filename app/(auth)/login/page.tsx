import { Metadata } from "next"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { UserAuthForm } from "@/components/user-auth-form"

export const metadata: Metadata = {
    title: "Login",
    description: "Login to your account",
}

export default async function LoginPage() {
    return (
        <div className="container flex h-screen w-screen flex-col items-center justify-center font-sans">
            <Link
                href="/"
                className={cn(buttonVariants({ variant: "ghost" }), "absolute left-4 top-4 md:left-8 md:top-8")} >
                <>
                    <Icons.chevronLeft className="mr-2 h-4 w-4" />
                    Back
                </>
            </Link>
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center items-center">
                    <h1 className="text-3xl font-heading font-semibold tracking-tight">
                        Welcome to notify
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your username and password to sign in to your account
                    </p>
                </div>
                <UserAuthForm forLogin={true} />
            </div>
        </div>
    )
}

