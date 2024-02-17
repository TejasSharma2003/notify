'use client'
import Logo from "./logo";
import React from "react";
import { usePathname } from 'next/navigation'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import SearchBox from "@/components/search-box";
import SigninDialog from "./sigin-dialog";
import { Icons } from "./icons";
import UserDropDown from "./user-drop-down";
import Menu from "./menu";
import { DialogOverlay } from "@radix-ui/react-dialog";
import { Separator } from "./ui/separator";

type NavbarProps = {
    isAuthenticated: boolean
}

const Navbar = (context: NavbarProps) => {
    const pathname = usePathname();
    const [showDialog, setShowDialog] = React.useState(false);

    React.useEffect(() => {
        if (showDialog) {
            setShowDialog(false);
        }
    }, [pathname])

    return (
        <header className="fixed top-0 w-full z-50 bg-white border-b border-b-border">
            <nav className="font-sans flex justify-between px-4 lg:px-14 items-center py-5">
                <div className="lg:w-2/6 flex items-center">
                    <Menu />
                    <Logo className="ml-5" />
                </div>
                <div className="hidden  w-2/6 text-xs font-semibold lg:flex justify-center text-muted-foreground">
                    <span className="flex items-center">
                        <Icons.phone className="w-4 h-4 mr-1"/>
                        9832352589
                    </span>
                    <span className="mx-2">/</span>
                    <span className="flex items-center">
                        <Icons.mail className="w-4 h-4 mr-1"/>
                        hellonotify@gmail.com
                    </span>
                </div>
                <div className="lg:w-2/6 flex items-center justify-end  text-gray-900">
                    {!pathname.includes("search") &&
                        <Dialog open={showDialog}>
                            <DialogTrigger onClick={() => setShowDialog(true)}>
                                <div className="md:border flex text-muted-foreground items-center gap-2 rounded p-2 ">
                                    <span className="cursor-pointer">
                                        <Icons.search className="stroke-primary md:stroke-current w-6 md:w-4 " />
                                    </span>
                                    <p className="hidden md:block text-sm ">
                                        Click here to search articles.
                                    </p>
                                </div>
                            </DialogTrigger>
                            <DialogContent className="p-0" onCloseDialog={() => setShowDialog(false)}>
                                <SearchBox />
                            </DialogContent>
                        </Dialog>
                    }
                    <Separator className="mx-5 w-[0.8px] h-5" orientation="vertical" />
                    {context.isAuthenticated ?
                        <UserDropDown />
                        :
                        <div className="">
                            <SigninDialog />
                        </div>
                    }
                </div>
            </nav>
        </header>
    )
}

export default Navbar;
