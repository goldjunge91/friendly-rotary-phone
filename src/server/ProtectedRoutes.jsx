/**
 * Data Access Layer für Benutzeroperationen
 * @module data_layer/user-data-access-layer
 */
const db = require('@/db/db');
const { users } = require('@/db/schema');
const { eq } = require('drizzle-orm');

/**
 * Holt einen Benutzer anhand der E-Mail.
 * @param {string} email - Die E-Mail-Adresse des Benutzers.
 * @returns {Promise<Object|null>} Der Benutzer oder null, falls nicht gefunden.
 */
async function getUserByEmail(email) {
  return await db.select().from(users).where(eq(users.email, email)).get();
}

/**
 * Erstellt einen neuen Benutzer.
 * @param {string} email - Die E-Mail-Adresse.
 * @param {string} hashedPassword - Das gehashte Passwort.
 * @returns {Promise<Object>} Das Ergebnis der Einfügeoperation.
 */
async function createUser(email, hashedPassword) {
  return await db.insert(users).values({ email, password: hashedPassword });
}

/**
 * Löscht einen Benutzer anhand der E-Mail.
 * @param {string} email - Die E-Mail-Adresse des Benutzers.
 * @returns {Promise<Object>} Das Ergebnis der Löschoperation.
 */
async function deleteUserByEmail(email) {
  return await db.delete(users).where(eq(users.email, email));
}

/**
 * Exportiert die Benutzerfunktionen des Data Access Layers.
 */
module.exports = {
  getUserByEmail,
  createUser,
  deleteUserByEmail,
};