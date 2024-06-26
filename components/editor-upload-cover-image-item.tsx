import React from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { protectedEditorConfig } from "@/config/protected";
import { shimmer, toBase64 } from "@/lib/utils";
import { Loader2 as SpinnerIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { toast } from "./ui/use-toast";
import deleteCoverImage from "@/actions/delete-cover-image";

interface EditorUploadCoverImageItemProps {
    articleId: string;
    coverImage: string;
}

const EditorUploadCoverImageItem: FC<EditorUploadCoverImageItemProps> = async ({
    coverImage,
    articleId
}) => {
    const [isDeleteLoading, setIsDeleteLoading] = React.useState(false);

    // const imageUrl = `http://127.0.0.1/uploads/articles/${coverImage}`;
    const imageUrl = `/articles/${coverImage}`;
    return (
        <div className="col-span-full max-w-2xl">
            <Image
                src={imageUrl || "./image-not-found.jpg"}
                className="mb-5 rounded-lg shadow-sm"
                alt="Cover image"
                height={337}
                width={600}
                priority
                placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(600, 337))}`}
            />
            <div className="flex items-center gap-x-5">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive">
                            <TrashIcon className="mr-2 h-4 w-4" />
                            {protectedEditorConfig.deleteImage}
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader className="font-sans">
                            <AlertDialogTitle>
                                {protectedEditorConfig.deleteImageQuestion}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                {protectedEditorConfig.deleteImageDescription}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="font-sans">
                            <AlertDialogCancel>
                                {protectedEditorConfig.cancel}
                            </AlertDialogCancel>
                            <AlertDialogAction onClick={async () => {
                                setIsDeleteLoading(true);
                                const res = await deleteCoverImage({
                                    articleId,
                                    coverImage
                                });
                                if (res?.error) {
                                    toast({
                                        description: res.error
                                    })
                                }
                                setIsDeleteLoading(false);
                            }}>
                                {isDeleteLoading ? (
                                    <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <TrashIcon className="mr-2 h-4 w-4" />
                                )}
                                <span>{protectedEditorConfig.cofirm}</span>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
};

export default EditorUploadCoverImageItem;

