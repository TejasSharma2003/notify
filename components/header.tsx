import { Separator } from "./ui/separator"

interface DashboardHeaderProps {
    heading: string
    text?: string
    children?: React.ReactNode
}

export function DashboardHeader({
    heading,
    text,
    children,
}: DashboardHeaderProps) {
    return (
        <div className="flex flex-col gap-5 sm:gap-0 sm:flex-row items-center justify-between px-2">
            <div className="grid gap-1">
                <h1 className="font-heading font-bold text-2xl md:text-2xl">{heading}</h1>
                {text && <p className="text-base text-muted-foreground">{text}</p>}
            </div>
            {children}
        </div>
    )
}

