"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { mainNewsLetterConfig } from "@/config/main";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 as SpinnerIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "./ui/use-toast";
import { Button } from "./ui/button";

// Email validation schame for newsletter
const emailSchema = z.object({
    email: z.string().email({ message: 'Email is required.' }),
});

export default function NewsLetter() {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const form = useForm<z.infer<typeof emailSchema>>({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            email: "",
        },
    });

    async function onSubmit(data: z.infer<typeof emailSchema>) {
        setIsLoading(true);
        toast({
            title: "Newsletter subscribe",
            description: "Something went wrong. Pleas try again later."
        })
        return true;
    }
    return (
        <div className="mt-10 xl:mt-0">
            <h3 className="text-base font-medium leading-6">
                {mainNewsLetterConfig.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
                {mainNewsLetterConfig.description}
            </p>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="mt-6 sm:flex sm:max-w-md"
                >
                    <label htmlFor="email-address" className="sr-only">
                        {mainNewsLetterConfig.email}
                    </label>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="relative">
                                <FormControl>
                                    <Input
                                        className="w-full min-w-0 appearance-none rounded-md border-0 bg-white px-3 py-1.5 text-base text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:w-64 sm:text-sm sm:leading-6 xl:w-full"
                                        placeholder={mainNewsLetterConfig.email}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
                        <Button
                            disabled={isLoading}
                            type="submit"
                        >
                            {isLoading && (
                                <SpinnerIcon className="mr-2 h-6 w-6 animate-spin" />
                            )}
                            {mainNewsLetterConfig.subscribe}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

