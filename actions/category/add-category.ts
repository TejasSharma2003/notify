"use server"

import { categories } from "@/db/schema";
import { db } from "@/db";
import { categoryInputSchema } from "@/lib/validations/category";
import { z } from "zod";


type AddCategoryProps = z.infer<typeof categoryInputSchema>

export default async function addCategory(ctx : AddCategoryProps) {
    try {
        const data = categoryInputSchema.parse(ctx)
        await db.insert(categories).values({
            name: data.category
        })
    } catch (error: any) {
        let message = "Something went wrong";
        if ("code" in error) {
            if (error.code === "23505") {
                return {
                    success: false,
                    message: "This category already exists"
                }
            }
        }
        return {
            success: false,
            message
        }
    }
}
