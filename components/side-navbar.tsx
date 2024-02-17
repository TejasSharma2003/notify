import { cn } from "@/lib/utils";
import { SheetHeader } from "./ui/sheet";
import Logo from "./logo";
import Link from "next/link";
import { Icons } from "./icons";
import { usePathname } from "next/navigation";
import { menuConfig } from "@/config/menu";

const SideNavbar = () => {
    const pathname = usePathname();
    return (
        <>
            <SheetHeader>
                <Logo />
            </SheetHeader>
            <div className="mt-8 space-y-3">
                {menuConfig.map((item) => {
                    const Icon = Icons[item.icon];
                    return <Link href={item.href} className={cn("border-b border-muted/80 flex items-center gap-x-2 px-2 py-4 hover:bg-muted rounded-lg cursor-pointer transition-colors duration-300", {
                        "bg-muted": pathname === item.href
                    })}>
                        <Icon className="w-5 h-5 stroke-muted-foreground" />
                        <span className="capitalize">{item.title}</span>
                    </Link>
                })}
            </div>
        </>
    )
}

export default SideNavbar;
