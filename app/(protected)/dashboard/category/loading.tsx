import { CardSkeleton } from "@/components/card-skeleton"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export default function DashboardSettingsLoading() {
    return (
        <DashboardShell>
            <DashboardHeader
                heading="Add or Remove Category"
                text="Manage notify articles category."
            />
            <div className="grid gap-10">
                <CardSkeleton />
            </div>
        </DashboardShell>
    )
}


