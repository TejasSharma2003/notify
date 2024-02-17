import { cookies } from "next/headers"
import { JWTPayload, jwtVerify } from "jose"
import { AuthUser } from "@/types/auth"

type AuthPayload = {
    id: string,
    userName: string,
    role: string,
    iat: number,
    exp: number
}

export const isUserAuthenticated = () => {
    const cookieStore = cookies();
    const isAuthenticated = !!cookieStore.get('user');
    return isAuthenticated;
}

export function getJwtSecretKey() {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error('JWT Secret key is not set');
    }

    const enc: Uint8Array = new TextEncoder().encode(secret);
    return enc;
}

export function setUserDataCookie(user: AuthUser) {
    const cookieStore = cookies();

    cookieStore.set({
        name: 'user',
        value: JSON.stringify(user),
        path: '/',
        maxAge: 86400, // 24 hours
        sameSite: 'strict',
    });
}

export async function verifyJwtToken(token: string): Promise<JWTPayload | null> {
    try {
        const { payload } = await jwtVerify(token, getJwtSecretKey());

        return payload;
    } catch (error) {
        return null;
    }
}

export async function getJwt() {
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    if (token) {
        try {
            const payload = await verifyJwtToken(token.value);
            if (payload) {
                const authPayload: AuthPayload = {
                    id: payload.id as string,
                    userName: payload.userName as string,
                    role: payload.role as string,
                    iat: payload.iat as number,
                    exp: payload.exp as number,
                };
                return authPayload;
            }
        } catch (error) {
            return null;
        }
    }
    return null;
}


export async function logout() {
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    if (token) {
        try {
            cookieStore.delete('token');
        } catch (_) { }
    }

    const user = cookieStore.get('user');
    if (user) {
        try {
            cookieStore.delete('user');
            return true;
        } catch (_) { }
    }

    return null;
}


