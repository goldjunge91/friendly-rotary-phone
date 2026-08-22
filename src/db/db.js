

import { drizzle } from 'drizzle-orm/better-sqlite3';
const dbFile = process.env.DB_FILE_NAME || 'local.db';
const drizzleDb = drizzle({ connection: { source: dbFile } });

export default drizzleDb;