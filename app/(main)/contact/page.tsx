"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { mainPageContactConfig } from "@/config/main/pages";
import { contactFormSchema } from "@/lib/validations/contact";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 as SpinnerIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

type ContactFormValues = z.infer<typeof contactFormSchema>;

const defaultValues: Partial<ContactFormValues> = {
    name: "",
    email: "",
    message: "",
};

export default function ContactPage() {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactFormSchema),
        defaultValues,
    });

    async function onSubmit(data: ContactFormValues) {
        try {
            setIsLoading(true);
            // Send email using Nodemailer
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    message: data.message,
                }),
            });
            setIsLoading(false);
            form.reset();

            if (!response?.ok) {
                return
                // return toast.error(mainPageContactConfig.error);
            }
        } catch (error) {
            // Handle error
            console.error(mainPageContactConfig.error, error);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold font-heading tracking-tight  sm:text-4xl">
                Contact us
            </h1>
            <p className="mt-2 text-base leading-8 text-muted-foreground">
                Get in touch with us anytime, through email.
            </p>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="mt-8 space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-600">
                                    {mainPageContactConfig.name}
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-600">
                                    {mainPageContactConfig.email}
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-600">
                                    {mainPageContactConfig.message}
                                </FormLabel>
                                <FormControl>
                                    <Textarea className="resize-none" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        className="px-8"
                    >
                        {isLoading && <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />}
                        {mainPageContactConfig.send}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

