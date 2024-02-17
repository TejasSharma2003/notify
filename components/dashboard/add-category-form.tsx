"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { useForm } from "react-hook-form"
import addCategory from "@/actions/category/add-category"
import removeCategory from "@/actions/category/remove-category"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { categoryInputSchema } from "@/lib/validations/category"
import { categories } from "@/db/schema"

type CategoryForm = {
    value: string
}

type CategoryInputValues = z.infer<typeof categoryInputSchema>

export default function AddCategoryForm() {
    const { handleSubmit, register, formState: { errors }, getValues} = useForm({
        resolver: zodResolver(categoryInputSchema),
        defaultValues: {
            category: ""
        }
    });

    const [isSaving, setIsSaving] = React.useState(false);
    const [isRemovingCategory, setIsRemovingCategory] = React.useState(false);

    // dirty way of removing category probably make a different form for deleting categories ?
    const onRemoveCategory = async () => {
        setIsRemovingCategory(true);
        const category = getValues("category")
        if(!categories || typeof category !== "string" || category.length < 2) {
            setIsRemovingCategory(false);
            return toast({
                title: "Removing category",
                description: "Are you sure the category input is corrent?. It should be greater than 2 character(s)",
                variant: "destructive"
            })
        }
        const res = await removeCategory({
            category
        })
        if (res && !res.success) {
            toast({
                title: "Category",
                description: res.message,
                variant: "destructive"
            })
        } else {
            toast({
                title: "Category",
                description: "Category has been removed successfully"
            })
        }
        setIsRemovingCategory(false);
    }

    const onSubmit = async (data: CategoryInputValues) => {
        setIsSaving(true);
        const res = await addCategory({
            category: data.category
        })
        if (res && !res.success) {
            toast({
                title: "Category",
                description: res.message
            })
        } else {
            toast({
                title: "Category",
                description: "Category has been added successfully"
            })
        }
        setIsSaving(false);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card className="border">
                <CardHeader>
                    <CardTitle>Category</CardTitle>
                    <CardDescription>
                        With the added category user can upload articles by giving specific category.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="name">
                            Name
                        </Label>
                        <Input
                            id="category"
                            className="w-[400px]"
                            size={32}
                            {...register("category")}
                        />
                        {errors.category?.message && <span className="text-destructive">{errors.category.message}</span>}
                    </div>
                </CardContent>
                <CardFooter className="gap-4">
                    <button
                        type="submit"
                        className={cn(buttonVariants(),)}
                        disabled={isSaving}
                    >
                        {isSaving && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        <span>Add category</span>
                    </button>
                    <button
                        type="button"
                        className={cn(buttonVariants({ variant: "secondary" }),)}
                        onClick={onRemoveCategory}
                        disabled={isRemovingCategory}
                    >
                        {isRemovingCategory && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        <span>Remove category</span>
                    </button>
                </CardFooter>
            </Card>
        </form>
    )
}
