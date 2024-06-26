import * as z from "zod"

export const userAuthSchema = z.object({
    userName: z.string().min(3),
    password: z.string().min(4),
})

