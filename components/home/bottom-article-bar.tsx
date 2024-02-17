import LikeButton from "../like-button"
import DetailArticleShareButton from "../detail-article-share-button"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { Article } from "@/db/schema";

export function getUrl() {
    if (process.env.NODE_ENV === "development") {
        return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    } else {
        return process.env.NEXT_PUBLIC_WEB_URL || "https://notifyyy.vercel.app";
    }
}

export default function BottomArticleBar({ article }: { article: Article}) {
    return (
        <div className="flex items-center justify-between mt-4">
            <span className="text-gray-500">{article.reads}+ reads</span>
            <div className="flex text-sm border rounded-lg">
                <LikeButton likes={article.likes} articleId={article.id} />
                {/* <Separator orientation="vertical" /> */}
                <DetailArticleShareButton
                    title={article.title}
                    shares={article.shares}
                    description={article.description}
                    url={`${getUrl()}/news/${encodeURIComponent(
                        `${article.slug}`,
                    )}`}
                />
            </div>
        </div>
    )
}
