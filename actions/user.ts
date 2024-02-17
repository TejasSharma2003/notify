import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { getJwt, logout } from "@/lib/server/auth"

export async function getAuthUserFromDb() {
    const jwt = await getJwt();

    if (!jwt) {
        return null;
    }

    const res = await db.select({
        id: users.id,
        userName: users.userName,
        role: users.id
    })
        .from(users)
        .where(eq(users.id, jwt.id));
    const user = res[0];

    if (!user) {
        await logout();
        return null;
    }

    return user;
}

export async function getCurrentUser() {
    try {
        const payload = await getJwt();
        if (!payload) {
            return null;
        }

        const res = await db.select({
            id: users.id,
            userName: users.userName
        })
            .from(users)
            .where(eq(users.id, payload.id))
        const user = res[0];
        if (!user) {
            return null;
        }
        return res[0];
    } catch (error) {
        console.log("error in getCurrentUser", error);
        return null
    }
}

export async function getUserFromDb(userName: string) {
    try {
        const result = await db
            .select()
            .from(users)
            .where(eq(users.userName, userName));
        const user = result[0];
        if (!user) return null;
        return user;
    } catch (err) {
        console.log("error in getUserFromDb", err);
        return null;
    }

}
