"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Separator } from "../ui/separator"
import { userAccountFormSchema } from "@/lib/validations/user-account-form"
import changeUserPassword from "@/actions/users/change-user-password"
import { Variable } from "lucide-react"

type UserAccountForm = {
    userName: string,
    currentPassword: string,
    newPassword: string,
}

type UserAccountFormSchema = z.infer<typeof userAccountFormSchema>

type UserAccountFormProps = {
    userId: string
}

export default function UserAccountForm({ userId }: UserAccountFormProps) {
    const [isSaving, setIsSaving] = useState(false);

    const form = useForm<UserAccountFormSchema>({
        resolver: zodResolver(userAccountFormSchema),
        defaultValues: {
            userId
        },
        mode: "onChange"
    })

    const onSubmit = async (data: UserAccountFormSchema) => {
        setIsSaving(true);
        const res = await changeUserPassword({
            userId,
            currentPassword: data.currentPassword,
            newPassword: data.newPassword
        })
        if (res && !res.success) {
            toast({
                title: "Password update",
                description: res.message,
                variant: "destructive"
            })
        } else {
            toast({
                title: "Password update",
                description: "Your password has successfully changed."
            })
        }
        setIsSaving(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="currentPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Current password</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your current password" {...field} />
                            </FormControl>
                            <FormDescription>
                                Make sure you enter valid password.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New password</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter new password" {...field} />
                            </FormControl>
                            <FormDescription>
                                Please use strong a password.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">
                    {isSaving && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                    Update password</Button>
            </form>
        </Form>
    )
}
