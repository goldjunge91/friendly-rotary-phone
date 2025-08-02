const db = require('./db');
const { users } = require('./schema');
const { eq } = require('drizzle-orm');
const { hashPassword, verifyPassword } = require('../lib/hashing/password');

async function registerUser(email, password) {
  try {
    const hashed = await hashPassword(password);
    await db.insert(users).values({ email, password: hashed });
    return { success: true };
  } catch (err) {
    if (String(err).includes('UNIQUE')) {
      return { success: false, message: 'Email already registered' };
    }
    return { success: false, message: 'Registration error' };
  }
}

async function loginUser(email, password) {
  const user = await db.select().from(users).where(eq(users.email, email)).get();
  if (!user) return { success: false, message: 'User not found' };
  const match = await verifyPassword(user.password, password);
  if (!match) return { success: false, message: 'Invalid password' };
  return { success: true, user: { id: user.id, email: user.email } };
}

module.exports = { db, registerUser, loginUser };