import Category from "./category"
import { delay } from "@/lib/utils"
export default async function CategoryServer({ category }: { category: string }) {
    return <Category currentOpenCategory={category} />
} 
