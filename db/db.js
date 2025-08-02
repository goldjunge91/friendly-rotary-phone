require('dotenv').config();
const { drizzle } = require('drizzle-orm/better-sqlite3');
const db = drizzle({ connection: { source: process.env.DB_FILE_NAME } });

module.exports = db;
