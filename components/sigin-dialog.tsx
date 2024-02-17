"use client"
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button, buttonVariants } from "./ui/button"
import Logo from "./logo"
import { Separator } from "@radix-ui/react-separator"
import { Icons } from "./icons"
import { cn } from "@/lib/utils"
import Link from 'next/link'
import { toast } from './ui/use-toast'

export default function SigninDialog() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isGitHubLoading, setIsGitHubLoading] = React.useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = React.useState(false);
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className=''>
                    Sign in
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex flex-col justify-center items-center gap-2">
                        <Logo />
                        <h1 className='text-lg'>Login to notify</h1>
                    </DialogTitle>
                    <Separator />
                    <div className='flex flex-col gap-y-4 py-4 px-8 '>
                        <Button
                            className={cn(buttonVariants({ variant: "outline" }))}
                            onClick={() => {
                                setIsGitHubLoading(true);
                                toast({
                                    variant: "destructive",
                                    title: "Authentication",
                                    description: "Signing in is currently not available. Please try again later!"
                                })
                                setIsGitHubLoading(false);
                                // signIn("github")

                            }}
                            disabled={isLoading || isGitHubLoading}
                        >
                            {isGitHubLoading ? (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Icons.gitHub className="mr-2 h-4 w-4" />
                            )}
                            Github
                        </Button>
                        <Button
                            className={cn(buttonVariants({ variant: "outline" }))}
                            onClick={() => {
                                setIsGoogleLoading(true)
                                toast({
                                    variant: "destructive",
                                    title: "Authentication",
                                    description: "Signing in is currently not available. Please try again later!"
                                })
                                setIsGoogleLoading(false);
                            }}
                            disabled={isLoading || isGoogleLoading}
                        >
                            {isGoogleLoading ? (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Icons.google className="mr-2 h-4 w-4" />
                            )}
                            Google
                        </Button>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                    </div>
                    <div className='flex justify-center py-4'>
                        <Link href="/login">
                            <Button className='text-base'>
                                Sign in as author
                            </Button>
                        </Link>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog >
    )
}

