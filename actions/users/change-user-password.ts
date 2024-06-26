"use server"

import { eq } from "drizzle-orm"

import { db } from "@/db"
import { users } from "@/db/schema"

import { userAccountFormSchema } from "@/lib/validations/user-account-form"
import { hashUserPassword, verifyUserPassword } from "@/lib/server/hash"

import { ZodError, z } from "zod"

type ChangeUserPasswordProps = z.infer<typeof userAccountFormSchema>

export default async function changeUserPassword(ctx: ChangeUserPasswordProps) {
    try {
        //TODO: change zod schema so that if currentpassword and the newpassword are same it should throw error instead of quering db.
        const data = userAccountFormSchema.parse(ctx);
        if (data.currentPassword === data.newPassword) {
            return {
                success: false,
                message: "Current password and new password are same. Please try different password"
            }
        }

        // check if the user still exists
        const res = await db.select()
            .from(users)
            .where(eq(users.id, data.userId))
        const user = res[0];
        if (!user) {
            return null;
        }

        // check if the current password entered by the user is corrent
        if (!(await verifyUserPassword(data.currentPassword, user.password))) {
            return {
                success: false,
                message: "Incorrect password. Please recheck the password"
            }
        }

        // hash the new password and update
        const hashedPassword = await hashUserPassword(data.newPassword);
        await db.update(users)
            .set({
                password: hashedPassword
            })
            .where(eq(users.id, data.userId))

    } catch (error) {
        let message = "Something went wrong"
        console.log("Error in changeUserPassword", error);
        if (error instanceof ZodError) {
            return {
                success: false,
                message: error.message
            }
        }
        return {
            success: false,
            message
        }
    }

}
