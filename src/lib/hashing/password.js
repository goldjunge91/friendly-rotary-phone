const argon2 = require('argon2');


async function hashPassword(password) {
  try {
    return await argon2.hash(password);
  } catch (err) {
    throw new Error('Operation failed');
  }
}

async function verifyPassword(hashed, plain) {
  try {
    return await argon2.verify(hashed, plain);
  } catch (err) {
    throw new Error('Operation failed');
  }
}

module.exports = { hashPassword, verifyPassword };
