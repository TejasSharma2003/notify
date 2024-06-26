"use server"
import path from "path"
import fs from "fs"

import { db } from "@/db"
import { articles } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

type deleteCoverImageProps = {
    articleId: string
    coverImage: string
}

export default async function deleteCoverImage({ articleId, coverImage }: deleteCoverImageProps) {
    try {
        // const imagePath = path.join(process.cwd(), `uploads/articles/${coverImage}`);
        const imagePath = path.join(process.cwd(), `public/articles/${coverImage}`);
        fs.access(imagePath, err => {
            if (err) {
                return {
                    error: "File doesn't exist"
                }
            }
        });

        fs.unlink(imagePath, err => {
            if (err) {
                return {
                    error: "Can't delete the file. Please try again later!"
                }
            }
        })

        await db?.update(articles)
            .set({ coverImage: "" })
            .where(eq(articles.id, articleId));

    } catch (err) {
        return {
            error: "Can't delete the cover image. Please try again later!"
        }
    } finally {
        revalidatePath("/editor/[articleId]", "page");
    }
}
