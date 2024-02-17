import * as z from "zod"
import { createSelectSchema } from 'drizzle-zod';
import { articles } from "@/db/schema";


export const articlePatchSchema = z.object({
    content: z.any().optional(),
})

export const articleUpdateSchema = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string().optional(),
    slug: z.string(),
    description: z.string(),
})

export const articleEditFormSchema = z.object({
    title: z
        .string()
        .min(2, {
            message: "Title must be at least 2 characters.",
        })
        .max(120, {
            message: "Title must not be longer than 120 characters.",
        }),
    slug: z
        .string()
        .min(2, {
            message: "Slug must be at least 2 characters.",
        })
        .max(100, {
            message: "Slug must not be longer than 100 characters.",
        }),
    coverImage: z.string().optional(),
    category: z.string().toLowerCase().min(1, {
        message: "Category is required"
    }),
    description: z
        .string()
        .min(2, {
            message: "Description must be at least 2 characters.",
        })
        .max(300, {
            message: "Description must not be longer than 300 characters.",
        }),
    content: z.any()
});


