import { notFound } from "next/navigation"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import UserAccountForm from "@/components/dashboard/user-account-form"
import { getCurrentUser } from "@/actions/user"
import UserNameForm from "@/components/user-name-form"
import { Separator } from "@/components/ui/separator"

export const metadata = {
    title: "Settings",
    description: "Manage account and website settings.",
}

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
    const user = await getCurrentUser();
    if (!user) {
        return notFound();
    }
    return (
        <DashboardShell>
            <DashboardHeader
                heading="Settings"
                text="Manage account and website settings."
            />
            <div className="grid gap-10 max-w-2xl">
                <UserNameForm username={user.userName} userId={user.id} />
                <Separator />
                <UserAccountForm userId={user.id} />
            </div>
        </DashboardShell>
    )
}

