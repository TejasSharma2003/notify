"use server"

import { categories } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm"
import { categoryInputSchema } from "@/lib/validations/category";
import { ZodError, z } from "zod";


type AddCategoryProps = z.infer<typeof categoryInputSchema>

export default async function addCategory(ctx: AddCategoryProps) {
    try {
        const data = categoryInputSchema.parse(ctx)
        const res = await db.delete(categories)
        .where(eq(categories.name, data.category))
        console.log("res", res);
    } catch (error: any) {
        console.log(error);
        let message = "Something went wrong";
        if(error instanceof ZodError) {
            return {
                success: false,
                message: JSON.stringify(error.errors) 
            }
        } else if ("code" in error) {
            if (error.code === "23503") {
                return {
                    success: false,
                    message: "There are articles published with this category. Category can't be deleted"
                }
            }
        }
        return {
            success: false,
            message
        }
    }
}
