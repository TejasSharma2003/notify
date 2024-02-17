import cookie from "cookie"

export function getAuthUserFromCookie() {
    const cookies = cookie.parse(document.cookie);
    const { user } = cookies;
    if (!user) return null;
    try {
        return JSON.parse(user);
    } catch (error) {
        return null;
    }
}
