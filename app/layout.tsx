import "../styles/global.css"
import localFont from "next/font/local"
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/auth-context";

const lato = localFont({
    src: [
        {
            path: "../assets/fonts/Lato-Thin.ttf",
            weight: '100'
        },
        {
            path: "../assets/fonts/Lato-Light.ttf",
            weight: '300'
        },
        {
            path: "../assets/fonts/Lato-Regular.ttf",
            weight: '400'
        },
        {
            path: "../assets/fonts/Lato-Bold.ttf",
            weight: '700'
        },
        {
            path: "../assets/fonts/Lato-Black.ttf",
            weight: '900'
        },
    ],
    variable: '--font-sans'
})

const fontHeading = localFont({
    src: "../assets/fonts/PlayfairDisplay-SemiBold.ttf",
    variable: "--font-heading"
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${lato.variable} ${fontHeading.variable}`}>
                <Toaster />
                <AuthProvider>
                    {children}
                </AuthProvider>
            </body>
        </html>
    )
}
