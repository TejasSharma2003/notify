import { getAuthUserFromDb } from "@/actions/user";
import { logout } from "@/lib/server/auth";
import { setUserDataCookie } from "@/lib/server/auth";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const user = await getAuthUserFromDb();
        if (!user) {
            throw new Error("User not found");
        }

        const response = {
            success: true,
            user,
        };

        // Refresh our userdata cookie in case information was changed elsewhere
        setUserDataCookie(user);

        return new Response(JSON.stringify(response), {
            headers: {
                'content-type': 'application/json',
            },
        });

    } catch (err: any) {
        console.error(err);
        // Call logout in case of error, err on the side of caution
        logout();
        let message = 'Something went wrong';
        if (err.message) message = err.message;
        const response = {
            success: false,
            message,
        };
        return new Response(JSON.stringify(response), {
            status: 500,
            headers: {
                'content-type': 'application/json',
            },
        });
    }
}
