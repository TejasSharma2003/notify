import * as z from "zod";

export const imageDeleteSchema = z.object({
    authorId: z.string(),
    articleId: z.string(),
    coverImage: z.string(),
});

