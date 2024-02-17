import { z } from "zod"

export const usernameSchema = z.object({
    userId: z.string(),
    username: z.string().min(2, {
        message: "Username must contain atleast 2 character(s)"
    })
})

