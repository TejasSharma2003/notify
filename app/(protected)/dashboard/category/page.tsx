import { DashboardShell } from "@/components/shell"
import { DashboardHeader } from "@/components/header"
import AddCategoryForm from "@/components/dashboard/add-category-form"


export default async function CategoryPage() {
    return (
        <DashboardShell>
            <DashboardHeader
                heading="Add or Remove Category"
                text="Manage notify articles category."
            />
            <div className="grid gap-10">
                <AddCategoryForm />
            </div>
        </DashboardShell>
    )
}
