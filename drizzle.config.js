// import 'dotenv/config';
// import { defineConfig } from 'drizzle-kit';
// export default defineConfig({
//   out: './drizzle',
//   schema: './db/schema.ts',
//   dialect: 'sqlite',
//   dbCredentials: {
//     url: process.env.DATABASE_URL!,
//   },
// });

require('dotenv').config();
/** @type {import('drizzle-orm').DrizzleConfig} */
module.exports = {
  out: './drizzle',
  schema: './db/schema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.DB_FILE_NAME,
  },
};