const { drizzle } = require('drizzle-orm/better-sqlite3');

const dbFile = process.env.DB_FILE_NAME || 'local.db';
const db = drizzle({ connection: { source: dbFile } });

module.exports = db;