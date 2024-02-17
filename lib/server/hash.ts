// Creating diff file for bcrypt because it relies on Node.js APIs not available in Next.js Middleware.

import bcrypt from "bcrypt"

let saltRounds = 10;

export async function verifyUserPassword(password: string, hashedPassword: string) {
    // check if the password is valid
    return await bcrypt.compare(password, hashedPassword);
}

export async function hashUserPassword(password: string) {
    return await bcrypt.hash(password, saltRounds);

}
