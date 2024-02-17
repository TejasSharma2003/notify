import Link from "next/link";
import { v4 } from "uuid";
import { Icons } from "./icons";
import NewsLetter from "./news-letter";
import { Separator } from "./ui/separator";

const mainCategoryConfig: CategoryType[] = [
    {
        id: "",
        title: "Home",
        slug: "/",
    },
    {
        id: "4db30a13-2797-4c7d-a0ce-e0c127287a39",
        title: "Science",
        slug: "science",
    },
    {
        id: "c13ae4a7-476c-4608-9b7a-9ec9488c42e4",
        title: "Health",
        slug: "health",
    },
    {
        id: "7b8781b0-b4fa-40e4-ac23-5310640eecd7",
        title: "Marketing",
        slug: "marketing",
    },
    {
        id: "962f860d-ab0d-4650-ae93-8171c8b47169",
        title: "Technology",
        slug: "technology",
    },
];

const mainFooterConfig = {
    categories: mainCategoryConfig,
    pages: [
        {
            title: "Home",
            slug: "/",
        },
        {
            title: "About",
            slug: "/about",
        },
        {
            title: "Docs",
            slug: "/docs",
        },
        {
            title: "Changelogs",
            slug: "/changelogs",
        },
        {
            title: "Contact",
            slug: "/contact",
        },
    ],

    socials: [
        {
            name: "Facebook",
            url: "https://facebook.com",
            icon: Icons.facebook,
        },
        {
            name: "Github",
            url: "https://github.com/timtbdev",
            icon: Icons.gitHub,
        },
        // {
        //     name: "Instagram",
        //     url: "https://instagram.com",
        //     icon: Icons.,
        // },
        {
            name: "Twitter",
            url: "https://twitter.com/timtbdev",
            icon: Icons.twitter,
        },
    ],
    legals: [
        {
            title: "Terms",
            slug: "/terms",
        },
        {
            title: "Policy",
            slug: "/policy",
        },
    ],
    copyright: "Notfiy. All rights reserved.",
};

export default function Footer() {
    return (
        <>
            <Separator className="w-1/2 mx-auto mt-32" />
            <footer
                aria-labelledby="footer-heading"
            >
                <h2 id="footer-heading" className="sr-only">
                    Footer
                </h2>
                <div className="max-w-6xl mx-auto pb-8 pt-20 sm:pt-24 ">
                    <div className="xl:grid xl:grid-cols-3 xl:gap-2">
                        <div className="grid grid-cols-2 gap-8 xl:col-span-2">
                            <div className="md:grid md:grid-cols-2 md:gap-8">
                                <div>
                                    <h3 className="text-base font-medium leading-6 ">
                                        Categories
                                    </h3>
                                    <ul role="list" className="mt-6 space-y-4">
                                        {mainFooterConfig.categories.map((category) => (
                                            <li key={v4()}>
                                                <Link
                                                    href={
                                                        category.slug === "/"
                                                            ? category.slug
                                                            : `/category/${category.slug}`
                                                    }
                                                    className="text-sm leading-6 text-muted-foreground hover:text-black"
                                                >
                                                    {category.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-10 md:mt-0">
                                    <h3 className="text-base font-medium leading-6 text-black">
                                        Pages
                                    </h3>
                                    <ul role="list" className="mt-6 space-y-4">
                                        {mainFooterConfig.pages.map((page) => (
                                            <li key={v4()}>
                                                <Link
                                                    href={page.slug}
                                                    className="text-sm leading-6 text-muted-foreground hover:text-black"
                                                >
                                                    {page.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="md:grid md:grid-cols-2 md:gap-8">
                                <div>
                                    <h3 className="text-base font-medium leading-6">
                                        Socials
                                    </h3>
                                    <ul role="list" className="mt-6 space-y-4">
                                        {mainFooterConfig.socials.map((social) => (
                                            <li key={v4()}>
                                                <Link
                                                    href={social.url}
                                                    target="_blank"
                                                    className="text-sm leading-6 text-muted-foreground hover:text-black"
                                                >
                                                    {social.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-10 md:mt-0">
                                    <h3 className="text-base font-medium leading-6 text-gray-900">
                                        Legal
                                    </h3>
                                    <ul role="list" className="mt-6 space-y-4">
                                        {mainFooterConfig.legals.map((legal) => (
                                            <li key={v4()}>
                                                <Link
                                                    href={legal.slug}
                                                    className="text-sm leading-6 text-muted-foreground hover:text-black"
                                                >
                                                    {legal.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <NewsLetter />
                    </div>
                    <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 md:flex md:items-center md:justify-between lg:mt-24">
                        <div className="flex space-x-6 md:order-2">
                            {mainFooterConfig.socials.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.url}
                                    className="text-gray-400 hover:text-gray-500"
                                >
                                    <span className="sr-only">{item.name}</span>
                                    <item.icon className="h-6 w-6" aria-hidden="true" />
                                </a>
                            ))}
                        </div>
                        <p className="mt-8 text-sm leading-5 text-muted-foreground md:order-1 md:mt-0 space-x-4">
                            <span className="mr-2">
                                ©
                                {new Date().getFullYear()}
                            </span>
                            {mainFooterConfig.copyright}
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
};

