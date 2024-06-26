import bcrypt from 'bcrypt';
import { db } from '@/db';
import { users } from '@/db/schema';

async function addUser(name: string, password: string) {
	try {
		// hash the passord
		const hashedPassword = await bcrypt.hash(password, 12);
		await db
			.insert(users)
			.values({ userName: name, password: hashedPassword, role: 'admin' });
		console.log('Admin successfully added.');
		process.exit(0);
	} catch (err) {
		console.log(err);
	}
}

addUser('admin', 'admin');
