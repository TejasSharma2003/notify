import { SignJWT } from "jose";
import { NextResponse, NextRequest } from 'next/server';
import { getJwtSecretKey, setUserDataCookie } from "@/lib/server/auth"
import { verifyUserPassword  } from "@/lib/server/hash";
import { apiErrorResponse } from "@/lib/server/api/errorResponse";
import { getUserFromDb } from "@/actions/user";

type CredentialInput = {
    userName: string,
    password: string
}

export async function POST(request: NextRequest) {
    try {
        const res = await request.json();
        // TODO: sanitize user credentials
        let { userName, password }: CredentialInput = res;
        userName = userName.trim();
        password = password.trim();

        // check if user exist in the database.
        const user = await getUserFromDb(userName);
        if (!user || !(await verifyUserPassword(password, user.password))) {
            return NextResponse.json({ success: false, message: "Credentials are not valid. Please try again!" }, { status: 401 })
        }

        // if user is authentic user create a jwt token and send it as a cookie.
        // Create and sign our JWT
        const token = await new SignJWT({
            id: user.id,
            userName: user.userName,
        }).setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('8h') // TODO: make this time a bit better IDK
            .sign(getJwtSecretKey());

        const response = NextResponse.json({
            success: true,
        });

        // Store our JWT as a secure, HTTP-only cookie
        response.cookies.set({
            name: 'token',
            value: token,
            path: '/', // Accessible site-wide
            maxAge: 86400, // 24-hours or whatever you like
            httpOnly: true, // This prevents scripts from accessing
            sameSite: 'strict', // This does not allow other sites to access
        });

        // Storing user data in the cookie NOTE: Note httpOnly cookie
        const authUser = {
            id: user.id,
            userName: user.userName,
            role: user.role
        }
        setUserDataCookie(authUser);

        return response;
    } catch (error: any) {
        console.log("This is error form here", error);
        return apiErrorResponse(error);
    }

}
