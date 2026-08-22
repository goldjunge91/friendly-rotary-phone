
import db from './db.js';
import { users } from './schema.js';
import { eq } from 'drizzle-orm';
import { hashPassword, verifyPassword } from '../lib/hashing/password.js';
import { getUserByEmail, createUser } from '../data_layer/user-data-access-layer.js';

async function registerUser(email, password) {
  try {
    const existing = await getUserByEmail(email);
    if (existing) {
      return { success: false, message: 'Email already registered' };
    }
    const hashed = await hashPassword(password);
    await createUser(email, hashed);
    return { success: true };
  } catch (err) {
    console.error('registerUser error:', err);
    return { success: false, message: 'Registration error', error: String(err) };
  }
}

async function loginUser(email, password) {
  try {
    const user = await db.select().from(users).where(eq(users.email, email)).get();
    if (!user) return { success: false, message: 'User not found' };
    const match = await verifyPassword(user.password, password);
    if (!match) return { success: false, message: 'Invalid password' };
    return { success: true, user: { id: user.id, email: user.email } };
  } catch (err) {
    console.error('loginUser error:', err);
    return { success: false, message: 'Login error', error: String(err) };
  }
}

export { db, registerUser, loginUser };