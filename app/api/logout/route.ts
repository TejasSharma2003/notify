import { logout } from "@/lib/server/auth";

export const dynamic = "force-dynamic";
export async function GET() {
    await logout();

    const response = {
        success: true,
        message: 'Logged out successfully',
    };

    return new Response(JSON.stringify(response), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
