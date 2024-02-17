"use server"

import { usernameSchema } from "@/lib/validations/username-form"
import { ZodError, z } from "zod";
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"

type ChangeUsernameProps = z.infer<typeof usernameSchema>
export default async function changeUsername(ctx: ChangeUsernameProps) {
    try {
        const data = usernameSchema.parse(ctx);
        const res = await db.select()
            .from(users)
            .where(eq(users.userName, data.username))

        const dbUser = res[0];
        if (dbUser) {
            return {
                success: false,
                message: "Username already taken. Please give some different username."
            }
        }

        await db.update(users)
            .set({
                userName: data.username
            }).where(eq(users.id, data.userId))

    } catch (error) {
        let message = "Something went wrong"
        console.log("Error in changeUsername", error);
        if (error instanceof ZodError) {
            return {
                status: false,
                message: error.message
            }
        }
        return {
            status: false,
            message
        }
    }

}
