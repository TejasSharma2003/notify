import { z } from "zod";

export const userAccountFormSchema = z.object({
    userId: z.string(),
    currentPassword: z
        .string().min(8, {
            message: "Password should be atleast 8 characters long"
        }),
    newPassword: z
        .string().min(8, {
            message: "Password should be atleast 8 characters long"
        })
})
