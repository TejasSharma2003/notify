import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { loadEnvConfig } from "@next/env";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

loadEnvConfig(process.cwd());

const client = postgres(process.env.DB_URL!, {
    prepare: false
})

// Fix for "sorry, too many clients already"
declare global {
    // eslint-disable-next-line no-var -- only var works here
    var db: PostgresJsDatabase | undefined;
}

let db: PostgresJsDatabase;
if (process.env.NODE_ENV === "production") {
    db = drizzle(client);
} else {
    if (!global.db) global.db = drizzle(client);
    db = global.db;
}

export { db };

