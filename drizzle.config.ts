import type { Config } from 'drizzle-kit';
import { loadEnvConfig } from '@next/env';

loadEnvConfig(process.cwd());

export default {
	schema: './db/schema.ts',
	out: './drizzle',
	driver: 'pg',
	dialect: 'postgresql',
	dbCredentials: {
		connectionString: process.env.DB_URL!,
	},
};
