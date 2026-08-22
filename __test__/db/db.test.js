import { describe, it, expect } from 'vitest';
import { eq } from 'drizzle-orm';

import db from '@/db/db';
import { users } from '@/db/schema';

describe('db basic', () => {
  it('should connect and find users table', async () => {
    let error = null;
    try {
      await db.select().from(users).limit(1).all();
    } catch (e) {
      error = e;
    }
    expect(error).toBeNull();
  });

  it('should insert and read a user', async () => {
    const testEmail = 'testuser@example.com';
    const testPassword = 'testpassword';
    // Clean up any previous test user
    await db.delete(users).where(eq(users.email, testEmail));
    // Insert user
    await db.insert(users).values({ email: testEmail, password: testPassword });
    // Read user
    const result = await db.select().from(users).where(eq(users.email, testEmail)).get();
    expect(result).toBeDefined();
    expect(result.email).toBe(testEmail);
    expect(result.password).toBe(testPassword);
    // Clean up
    await db.delete(users).where(eq(users.email, testEmail));
  });

  it('should delete a user and verify removal', async () => {
    const testEmail = 'testuser2@example.com';
    const testPassword = 'testpassword2';
    // Ensure user does not exist
    await db.delete(users).where(eq(users.email, testEmail));
    // Insert user
    await db.insert(users).values({ email: testEmail, password: testPassword });
    // Delete user
    await db.delete(users).where(eq(users.email, testEmail));
    // Try to read user
    const result = await db.select().from(users).where(eq(users.email, testEmail)).get();
    expect(result).toBeUndefined();
  });
});