'use client'

import React from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import EditorJS from "@editorjs/editorjs"
import "@/styles/editor.css"
import { articlePatchSchema } from "@/lib/validations/article"

import { Icons } from "@/components/icons"
import { useForm } from 'react-hook-form';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button, buttonVariants } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Separator } from '@/components/ui/separator';
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { v4 } from 'uuid'

import Uppy from "@uppy/core";
import XHR from "@uppy/xhr-upload"
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import { DashboardModal } from "@uppy/react";

import slugify from "react-slugify";

import { articleEditFormSchema } from '@/lib/validations/article';
import { toast } from './ui/use-toast';
import { useRouter } from 'next/navigation';
import EditorUploadCoverImageItem from './editor-upload-cover-image-item';
import { Textarea } from './ui/textarea';
import { SparklesIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import EditorUploadCoverImagePlaceHolder from './ui/editor-upload-cover-image-placeholder';
import updateArticle from '@/actions/update-article';
import saveContent from '@/actions/save-content'
import { useDebouncedCallback } from 'use-debounce'
import { Article } from '@/db/schema'

type EditorFormValues = z.infer<typeof articleEditFormSchema>;

const NewEditor = ({ article }: { article: Article }) => {
    const ref = React.useRef<EditorJS>();
    const router = useRouter();
    const [showCoverModal, setShowCoverModal] = React.useState(false);
    const [isSaving, setIsSaving] = React.useState(false);
    const [showLoadingAlert, setShowLoadingAlert] = React.useState(false);
    const [isMounted, setIsMounted] = React.useState<boolean>(false)

    // Default values for the form
    const defaultValues: Partial<EditorFormValues> = {
        coverImage: article.coverImage || "",
        title: article.title || "Untitled Article",
        content: article.content || "",
        description: article.description || "",
        category: article.category || "",
        slug: article.slug || `post-${v4()}`,
    };

    const form = useForm<EditorFormValues>({
        resolver: zodResolver(articleEditFormSchema),
        defaultValues,
        mode: "onChange",
    });

    const constantSaveArticle = useDebouncedCallback(async (blocks: string) => {
        toast({
            description: "Saving your article..."
        })
        const res = await saveContent({
            content: blocks,
            articleId: article.id
        });
        if (!res) {
            return toast({
                title: "Save error",
                description: "Error occurred while saving your article. Please try again later.",
                variant: "destructive"
            })
        }
        toast({
            description: "Your article is saved"
        })
    }, 10000)

    // Rich text  editor editorjs
    const initializeEditor = React.useCallback(async () => {
        const EditorJS = (await import("@editorjs/editorjs")).default
        const Header = (await import("@editorjs/header")).default
        const Embed = (await import("@editorjs/embed")).default
        const Table = (await import("@editorjs/table")).default
        const List = (await import("@editorjs/list")).default
        const Code = (await import("@editorjs/code")).default
        const LinkTool = (await import("@editorjs/link")).default
        const InlineCode = (await import("@editorjs/inline-code")).default
        const Hyperlink = (await import('editorjs-hyperlink')).default
        const ColorPlugin = (await import('editorjs-text-color-plugin')).default

        const { content } = articlePatchSchema.parse(article);
        const body = JSON.parse(content);

        if (!ref.current) {
            const editor = new EditorJS({
                holder: "editor",
                onReady() {
                    ref.current = editor
                },
                onChange: async (api) => {
                    const blocks = await api.saver.save();
                    if (blocks) {
                        constantSaveArticle(JSON.stringify(blocks));
                    }
                },
                placeholder: "Type here to write your content...",
                inlineToolbar: true,
                data: body,
                tools: {
                    Color: {
                        class: ColorPlugin,
                        config: {
                            colorCollections: ['#EC7878', '#9C27B0', '#673AB7', '#3F51B5', '#0070FF', '#03A9F4', '#00BCD4', '#4CAF50', '#8BC34A', '#CDDC39', '#FFF'],
                            defaultColor: '#FF1300',
                            type: 'text',
                            customPicker: true // add a button to allow selecting any colour  
                        }
                    },
                    hyperlink: {
                        class: Hyperlink,
                        config: {
                            shortcut: 'CMD+L',
                            target: '_blank',
                            rel: 'nofollow',
                            validate: false,
                        }
                    },
                    header: {
                        class: Header,
                        config: {
                            placeholder: 'Enter a header',
                            levels: [1, 2, 3, 4, 5, 6],
                            defaultLevel: 3
                        }
                    },
                    linkTool: LinkTool,
                    list: List,
                    code: Code,
                    inlineCode: InlineCode,
                    table: Table,
                    embed: Embed
                }
            })
        }
    }, [article])

    React.useEffect(() => {
        if (typeof window !== "undefined") {
            setIsMounted(true)
        }
    }, [article])

    React.useEffect(() => {
        if (isMounted) {
            initializeEditor();

            return () => {
                ref.current?.destroy()
                ref.current = undefined
            }
        }
    }, [isMounted, initializeEditor])

    const onSubmit = async (data: EditorFormValues) => {
        setShowLoadingAlert(true);
        setIsSaving(true);

        const blocks = await ref?.current?.save();
        const res = await updateArticle({
            id: article.id,
            title: data.title,
            content: JSON.stringify(blocks),
            description: data.description,
            category: data.category,
            slug: data.slug,
        })
        if (!res?.success) {
            toast({
                title: "Adding article",
                description: "Something went wrong while saving the article. Please try again later!",
                variant: "destructive"
            })
        }
        if (res?.message) {
            toast({
                title: "Adding article",
                variant: "destructive",
                description: res.message
            })
        } else {
            toast({
                description: "You're article has been saved",
            })
        }
        setShowLoadingAlert(false);
        setIsSaving(false);
    }

    const [uppy] = React.useState(() => new Uppy({
        autoProceed: false,
        debug: false,
        allowMultipleUploadBatches: true,
        restrictions: {
            maxFileSize: 6000000,
            maxNumberOfFiles: 1,
        },
    }
    ).use(XHR, {
        endpoint: "/api/upload-cover-image",
        formData: true,
        fieldName: "cover_image",
        validateStatus: (status, responseText) => {
            if (status == 413) {
                toast({
                    title: "Cover image upload",
                    description: "The image too large max size allowed is 3MB",
                    variant: "destructive"
                })
                return false;
            }
            const res = JSON.parse(responseText);
            if (res?.status === 200) {
                toast({
                    title: "Cover image upload",
                    description: "File has been uploaded succesfully."
                })
                router.refresh();
                return true;
            }
            toast({
                title: "Cover image upload",
                description: "Something went wrong. Can't upload the image.",
                variant: "destructive",
            })
            return false;
        }
    }));

    uppy.on('file-added', (file) => {
        uppy.setFileMeta(file.id, {
            articleId: article.id
        });
    });

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                    <div className='flex justify-between items-center sticky top-10 w-full'>
                        <div className='flex items-center space-x-8'>
                            <Button type="button" className={cn(buttonVariants({ variant: "outline" }))} onClick={() => router.back()} >
                                <>
                                    <Icons.chevronLeft className="mr-2 h-4 w-4" />
                                    Back
                                </>
                            </Button>
                            <p className="text-sm text-muted-foreground">
                                {article.isPublished ? "Published" : "Draft"}
                            </p>
                        </div>
                        <Button type="submit" disabled={isSaving}>Save article</Button>
                    </div>
                    {/* Cover Image */}
                    <Card className="border max-w-2xl mx-auto mt-14 lg:mt-0">
                        <CardHeader>
                            <CardTitle>Cover Image</CardTitle>
                            <CardDescription>You can upload one cover image.</CardDescription>
                        </CardHeader>
                        <Separator className="mb-8" />
                        <CardContent className="space-y-4">
                            {/* Image */}
                            <FormField
                                control={form.control}
                                name="coverImage"
                                render={({ field }) => (
                                    <FormItem className="w-full max-w-xl">
                                        <FormControl>
                                            <Input
                                                placeholder="input placeholder"
                                                {...field}
                                                disabled={true}
                                                className="hidden bg-gray-50"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex w-full flex-col">
                                <DashboardModal
                                    uppy={uppy}
                                    open={showCoverModal}
                                    onRequestClose={() => setShowCoverModal(false)}
                                    disablePageScrollWhenModalOpen={false}
                                    showSelectedFiles
                                    showRemoveButtonAfterComplete
                                    note="Only JPG, PNG files are allowed"
                                    proudlyDisplayPoweredByUppy={false}
                                    showLinkToFileUploadResult
                                />
                                {article.coverImage === "" && (
                                    <div className="col-span-full">
                                        <div className="mb-1 flex items-center gap-x-3">
                                            <button
                                                onClick={() => setShowCoverModal(!showCoverModal)}
                                                type="button"
                                                className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                            >
                                                <span className="">
                                                    Upload image
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {article.coverImage !== "" ? (
                                    <EditorUploadCoverImageItem
                                        articleId={article.id}
                                        coverImage={article.coverImage || ""}
                                    />
                                ) : (
                                    <EditorUploadCoverImagePlaceHolder />
                                )}
                            </div>
                        </CardContent>
                    </Card>
                    <Card className='border max-w-2xl mx-auto'>
                        <CardHeader>
                            <CardTitle>
                                Write your article here
                            </CardTitle>
                            <CardDescription>
                                Write your article <kbd className='rounded-md border bg-muted px-1 text-xs uppercase'>Tab</kbd> to open option
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            <div className="prose !w-full !max-w-full prose-stone mx-auto dark:prose-invert border-black">
                                {form.formState.errors.title?.message && <span className='text-red-500'>{form.formState.errors.title?.message}</span>}
                                <TextareaAutosize
                                    autoFocus
                                    id="title"
                                    defaultValue={article.title}
                                    placeholder="Article"
                                    className="w-full resize-none font-heading appearance-none overflow-hidden bg-transparent text-5xl font-black focus:outline-none"
                                    {...form.register("title")}
                                />
                                <div id="editor" className="min-h-[500px]" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Short Description */}
                    <Card className="border max-w-2xl mx-auto">
                        <CardHeader>
                            <CardTitle>
                                General information
                            </CardTitle>
                            <CardDescription>
                                Update your  general information
                            </CardDescription>
                        </CardHeader>
                        <Separator className="mb-8" />
                        <CardContent className="space-y-4">
                            {/* Description */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Write a short description about your article"
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Give your article a particular category. Try 'Technology'"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="slug"
                                render={({ field }) => (
                                    <FormItem className="w-full max-w-md">
                                        <FormLabel>Slug</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Give a slug for your post"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                className="mt-2"
                                                onClick={() =>
                                                    field.onChange(slugify(form.getValues("title")))
                                                }
                                            >
                                                <SparklesIcon className="mr-2 h-4 w-4" />
                                                Generate slug
                                            </Button>
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>
                </form >
            </Form >
            <AlertDialog open={showLoadingAlert} onOpenChange={setShowLoadingAlert}>
                <AlertDialogContent className="font-sans">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-center">
                            Please wait
                        </AlertDialogTitle>
                        <AlertDialogDescription className="mx-auto text-center">
                            <Icons.spinner className='h-6 w-6 animate-spin' />
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default NewEditor;
