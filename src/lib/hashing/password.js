
import argon2 from 'argon2';

export async function hashPassword(password) {
  try {
    return await argon2.hash(password);
  } catch (err) {
    throw new Error('Operation failed');
  }
}

export async function verifyPassword(hashed, plain) {
  try {
    return await argon2.verify(hashed, plain);
  } catch (err) {
    throw new Error('Operation failed');
  }
}
