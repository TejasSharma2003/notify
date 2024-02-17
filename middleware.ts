import { NextResponse, NextRequest } from "next/server";
import { verifyJwtToken } from "./lib/server/auth";

// Function to delete auth cookies and redirect
function deleteCookiesAndRedirect(url: string) {
    const response = NextResponse.redirect(url);
    response.cookies.delete('token');
    response.cookies.delete('user');
    return response;
}

export async function middleware(req: NextRequest) {
    const token = req.cookies.get("token");
    const isAuth = !!token
    const isAuthPage =
        req.nextUrl.pathname.startsWith("/login") ||
        req.nextUrl.pathname.startsWith("/register")
    const loginUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/login?redirect=${req.nextUrl.pathname + req.nextUrl.search}`;


    if (isAuthPage) {
        if (isAuth) {
            try {
                const payload = await verifyJwtToken(token.value);
                if (payload) {
                    return NextResponse.redirect(new URL("/dashboard", req.url))
                }
            } catch (error) {
                console.log(error);
                return deleteCookiesAndRedirect(loginUrl);
            }
        }
        return null
    }

    if (!isAuth) {
        let from = req.nextUrl.pathname;
        if (req.nextUrl.search) {
            from += req.nextUrl.search;
        }

        return NextResponse.redirect(
            new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
        );
    }

    try {
        const payload = await verifyJwtToken(token.value);
        if (!payload) {
            console.log("Redirecting user to login page");
            return NextResponse.redirect(new URL("/login", req.url))
            // return deleteCookiesAndRedirect(loginUrl);
        }
    } catch (error) {
        console.error("Error in middleware", error);
        return deleteCookiesAndRedirect(loginUrl);
    }

    const res = NextResponse.next();
    return res;
}

export const config = {
    matcher: ["/dashboard/:path*", "/editor/:path*", "/login", "/register"]
}

