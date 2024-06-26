import fs from "fs"
import sharp from "sharp"
import { promisify } from "util";
import { db } from "@/db";
import { articles } from "@/db/schema";
import { eq } from "drizzle-orm"
import path from "path";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("cover_image") as Blob | null;

        if (!file || !(file instanceof Blob)) {
            return Response.json({ error: 'Invalid file blob.' }, { status: 400 });
        }

        const imageBuffer = Buffer.from(await file.arrayBuffer());
        const articleId = formData.get("articleId");
        if (!articleId || typeof articleId !== 'string') {
            return Response.json({ error: 'Invalid article ID.' }, { status: 400 });
        }

        // TODO: create more sophisticated image optimization process
        const editedImageBuffer = await sharp(imageBuffer)
            .jpeg()
            .toBuffer()
        const writeFileAsync = promisify(fs.writeFile);
        const imageName = `${articleId}-${new Date().toISOString()}.jpg`
        // await writeFileAsync(path.join(process.cwd(), "/uploads/articles/" + imageName), editedImageBuffer);
        await writeFileAsync(path.join(process.cwd(), "/public/articles/" + imageName), editedImageBuffer);

        // update the coverImage name of the article
        await db.update(articles)
            .set({
                coverImage: `${imageName}`
            }).where(eq(articles.id, articleId))

        return Response.json({
            status: 200,
            message: "Uploaded successfully"
        })

    } catch (error) {
        console.log("Error in upload cover image", error);
        return Response.json({
            status: 500,
            error: "Something bad happened"
        })
    }
}
