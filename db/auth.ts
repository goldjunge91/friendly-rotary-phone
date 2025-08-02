import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { users } from './schema';
import argon2 from 'argon2';
import { eq } from 'drizzle-orm';

const sqlite = new Database('auth.db');
export const db = drizzle(sqlite);


export async function registerUser(email, password) {
  try {
    const hashed = await argon2.hash(password);
    await db.insert(users).values({ email, password: hashed });
    return { success: true };
  } catch (err) {
    if (String(err).includes('UNIQUE')) {
      return { success: false, message: 'Email already registered' };
    }
    return { success: false, message: 'Registration error' };
  }
}

export async function loginUser(email, password) {
  const user = await db.select().from(users).where(eq(users.email, email)).get();
  if (!user) return { success: false, message: 'User not found' };
  const match = await argon2.verify(user.password, password);
  if (!match) return { success: false, message: 'Invalid password' };
  return { success: true, user: { id: user.id, email: user.email } };
}
