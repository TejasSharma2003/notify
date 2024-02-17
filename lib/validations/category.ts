import { z } from "zod"

export const categoryInputSchema = z.object({
    category: z.string().min(2, {
        message: "It ought to be longer than 2 character(s)"
    }).toLowerCase().trim()
})
