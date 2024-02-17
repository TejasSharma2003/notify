"use client"

import * as React from "react"

import { useRouter } from 'next/navigation'

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { cn } from "@/lib/utils"
import { userAuthSchema } from "@/lib/validations/auth"

import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

import { ApiResponse } from "@/types/auth"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
    forLogin?: boolean
}

type FormData = z.infer<typeof userAuthSchema>

export function UserAuthForm({ className, forLogin, ...props }: UserAuthFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(userAuthSchema) });
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const router = useRouter();

    async function onSubmit(formValue: FormData) {
        setIsLoading(true);
        try {
            // TODO: sanitize the input
            const userName = formValue.userName;
            const password = formValue.password;

            const res = await fetch("/api/login", {
                method: "POST",
                body: JSON.stringify({
                    userName,
                    password
                })
            })
            const data: ApiResponse = await res.json();
            if (data.success) {
                router.push("/dashboard");
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            if (error instanceof Error) {
                return toast({
                    variant: "destructive",
                    description: error.message
                })
            } else {
                return toast({
                    variant: "destructive",
                    description: "Something went wrong"
                })
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="username">
                            User Name
                        </Label>
                        <Input
                            className="font-medium"
                            id="username"
                            placeholder="your username"
                            type="text"
                            autoCapitalize="none"
                            autoCorrect="off"
                            disabled={isLoading}
                            {...register("userName")}
                        />
                        {errors?.userName && (
                            <p className="px-1 text-sm text-red-600">
                                {errors.userName.message}
                            </p>
                        )}
                        <Label className="sr-only" htmlFor="password">
                            password
                        </Label>
                        <Input
                            id="password"
                            placeholder="your password"
                            type="password"
                            disabled={isLoading}
                            {...register("password")}
                        />
                        {errors?.password && (
                            <p className="px-1 text-sm text-red-600">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    <button className={cn(buttonVariants())} disabled={isLoading}>
                        {(isLoading) && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {forLogin ? <span className="text-sm"> Sign In with Credentials </span>
                            :
                            <span> Sign Up with Credentials </span>}
                    </button>
                </div>
            </form>
        </div>
    )
}

