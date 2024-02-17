"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

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
import { Button } from "@/components/ui/button"
import { usernameSchema } from "@/lib/validations/username-form"
import changeUsername from "@/actions/users/change-username"
import { toast } from "./ui/use-toast"
import { Icons } from "./icons"

type UsernameFormValues = z.infer<typeof usernameSchema>

type UsernameFormProps = {
    username: string,
    userId: string
}


export default function UsernameForm({ username, userId }: UsernameFormProps) {
    const [isSaving, setIsSaving] = React.useState(false);

    const defaultValues = {
        userId,
        username
    }

    const form = useForm<UsernameFormValues>({
        resolver: zodResolver(usernameSchema),
        defaultValues,
        mode: "onChange"
    })

    const onSubmit = async (data: UsernameFormValues) => {
        setIsSaving(true);
        const res = await changeUsername({
            userId: userId,
            username: data.username
        });
        if (res && !res.success) {
            toast({
                title: "Change username",
                description: res?.message,
                variant: "destructive"
            })
        } else {
            toast({
                title: "Change username",
                description: "Your username has successfully changed."
            })
        }
        setIsSaving(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-medium">Your username</FormLabel>
                            <FormControl>
                                <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the name that will be displayed on your profile.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">
                    {isSaving && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                    Save changes
                </Button>
            </form>
        </Form>
    )
}

