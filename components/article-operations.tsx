"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Icons } from "@/components/icons"
import deleteArticle from "@/actions/delete-article"
import publishArticle from "@/actions/publish-article"
import toogleFeatureStatus from "@/actions/toogle-feature-status"
// import { hideArticleFromSidebar, showArticleInSidebar } from "@/actions/articles/sidebar-article-visibility"
import { toast } from "./ui/use-toast"
import unpublishArticle from "@/actions/unpublish-article"

type ArticleOperationsProps = {
    articleId: string,
    isPublished: boolean,
    isFeatured: boolean
}


export function ArticleOperations({ articleId, isPublished, isFeatured }: ArticleOperationsProps) {
    const router = useRouter()
    const [showPublishPopup, setShowPublishPopup] = React.useState<boolean>(false);
    const [showUnpublishPopup, setShowUnpublishPopup] = React.useState<boolean>(false);
    const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false);
    const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false);
    const [isPublishLoading, setIsPublishLoading] = React.useState<boolean>(false);
    const [isUnpublishLoading, setIsUnpublishLoading] = React.useState<boolean>(false);
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted">
                    <Icons.ellipsis className="h-4 w-4" />
                    <span className="sr-only">Open</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                        <Link href={`/editor/${articleId}`} className="flex w-full">
                            Edit
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {isPublished ? (
                        <DropdownMenuItem
                            className="flex cursor-pointer items-center"
                            onSelect={() => setShowUnpublishPopup(true)} >
                            Unpublish
                        </DropdownMenuItem>
                    ) : (
                        <DropdownMenuItem
                            className="flex cursor-pointer items-center"
                            onSelect={() => setShowPublishPopup(true)} >
                            Publish
                        </DropdownMenuItem>
                    )
                    }
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="flex cursor-pointer items-center"
                        onClick={async () => {
                            const res = await toogleFeatureStatus({
                                articleId,
                                isFeatured
                            });
                            if (res?.error) {
                                return toast({
                                    variant: "destructive",
                                    description: res.error

                                })
                            }
                            toast({
                                description: res.message
                            })
                        }}>
                        Toggle Feature Status
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="flex cursor-pointer items-center text-destructive focus:text-destructive"
                        onSelect={() => setShowDeleteAlert(true)}
                    >
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you sure you want to delete this article?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={async (event) => {
                                event.preventDefault()
                                setIsDeleteLoading(true)

                                const res = await deleteArticle(articleId)
                                if (res?.error) {
                                    toast({
                                        variant: "destructive",
                                        description: res?.error
                                    })
                                }
                                toast({
                                    description: res.message
                                })
                                setIsDeleteLoading(false)
                                setShowDeleteAlert(false)
                                router.refresh()
                            }}
                            className="bg-red-600 focus:ring-red-600"
                        >
                            {isDeleteLoading ? (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Icons.trash className="mr-2 h-4 w-4" />
                            )}
                            <span>Delete</span>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={showPublishPopup} onOpenChange={setShowPublishPopup}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you sure you want to Publish this article?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            You can later mark this article as unpublished.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={async (event) => {
                                event.preventDefault()
                                setIsPublishLoading(true)
                                const res = await publishArticle(articleId)
                                if (res?.error) {
                                    toast({
                                        description: res.error
                                    })
                                }
                                setIsPublishLoading(false);
                                setShowPublishPopup(false);
                            }}
                            className="bg-primary focus:ring-red-600"
                        >
                            {isPublishLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                            Publish
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={showUnpublishPopup} onOpenChange={setShowUnpublishPopup}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you sure you want to Unpublish this article?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            You can later mark this article as published.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={async (event) => {
                                event.preventDefault()
                                setIsUnpublishLoading(true)
                                const res = await unpublishArticle(articleId)
                                if (res?.error) {
                                    toast({
                                        description: res.error
                                    })

                                }
                                setIsUnpublishLoading(false);
                                setShowUnpublishPopup(false);
                            }}
                            className="bg-primary focus:ring-red-600"
                        >
                            {isUnpublishLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                            Unpublish
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

