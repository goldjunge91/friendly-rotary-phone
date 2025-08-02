
import express from "express";
const router = express.Router();
import STATUS from "../../config/http-status.js";
import { jwtVerify, SignJWT } from "jose";
const SECRET_KEY = process.env.SECRET_KEY;
import { registerUser, loginUser } from "../../db/auth.js";
import { hashPassword, verifyPassword } from "../../lib/hashing/password.js";

// Middleware:
async function verifyToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token)
    return res.status(STATUS.FORBIDDEN).json({ message: "No token provided." });
  try {
    await jwtVerify(token, new TextEncoder().encode(SECRET_KEY));
    next();
  } catch (err) {
    res
      .status(STATUS.UNAUTHORIZED)
      .json({ message: "Invalid or expired token." });
  }
}

/**
 * API zum Registrieren eines neuen Benutzers.
 * @param {import('express').Request} req - Express Request-Objekt, erwartet 'email' und 'password' im Body.
 * @param {import('express').Response} res - Express Response-Objekt.
 * @return {Object} JSON mit Erfolg oder Fehlermeldung.
 */
router.post("/register", async (req, res) => {
  const { email, password } = req.body; // Hole die E-Mail und das Passwort aus dem Request-Body
  if (!email || !password)
    return res
      .status(STATUS.BAD_REQUEST)
      .json({ success: false, message: "Missing fields" }); // Prüfe, ob Felder fehlen
  try {
    const result = await registerUser(email, password);
    if (!result.success && result.message === 'Email already registered') {
      return res.status(STATUS.CONFLICT).json(result);
    }
    if (!result.success) {
      // Expose error details for debugging
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ ...result, debug: result.error });
    }
    res.status(STATUS.OK).json(result);
  } catch (err) {
    console.error('Registration error:', err);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: "Registration error", debug: String(err) });
  }
});

/**
 * API zum Login eines Benutzers mit JWT-Token.
 * @param {import('express').Request} req - Express Request-Objekt, erwartet 'email' und 'password' im Body.
 * @param {import('express').Response} res - Express Response-Objekt.
 * @return {Object} JSON mit Erfolg, Token und Benutzerdaten oder Fehlermeldung.
 */
// router.post("/login", async (req, res) => {
//     const { email, password } = req.body; // Hole die E-Mail und das Passwort aus dem Request-Body
//     if (!email || !password)
//         return res
//             .status(STATUS.BAD_REQUEST)
//             .json({ success: false, message: "Missing fields" }); // Prüfe, ob Felder fehlen
//     try {
//         const user = await getUserByEmail(email); // Suche den Benutzer in der Datenbank
//         if (!user) {
//             return res
//                 .status(STATUS.UNAUTHORIZED)
//                 .json({ success: false, message: "Invalid credentials" }); // Fehler, falls Benutzer nicht existiert
//         }
//         const match = await verifyPassword(user.password, password); // Prüfe das Passwort
//         if (!match) {
//             return res
//                 .status(STATUS.UNAUTHORIZED)
//                 .json({ success: false, message: "Invalid credentials" }); // Fehler, falls Passwort falsch
//         }
//         // JWT Token generieren
//         const payload = { id: user.id, email: user.email };
//         const token = await new SignJWT(payload)
//             .setProtectedHeader({ alg: "HS256" })
//             .setIssuedAt()
//             .setExpirationTime("1h")
//             .sign(new TextEncoder().encode(SECRET_KEY));
//         res
//             .status(STATUS.OK)
//             .json({ success: true, token, user: { id: user.id, email: user.email } }); // Erfolg, Token und Userdaten zurückgeben
//     } catch (err) {
//         res
//             .status(STATUS.INTERNAL_SERVER_ERROR)
//             .json({ success: false, message: "Login error" }); // Fehlerbehandlung
//     }
// });
router.post("/login", async (req, res) => {
  const { email, password } = req.body; // Hole die E-Mail und das Passwort aus dem Request-Body
  if (!email || !password)
    return res
      .status(STATUS.BAD_REQUEST)
      .json({ success: false, message: "Missing fields" }); // Prüfe, ob Felder fehlen
  try {
    const result = await loginUser(email, password);
    if (!result.success && result.message === 'User not found') {
      return res.status(STATUS.UNAUTHORIZED).json({ success: false, debug: result.error });
    }
    if (!result.success && result.message === 'Invalid password') {
      return res.status(STATUS.UNAUTHORIZED).json({ success: false, debug: result.error });
    }
    if (!result.success) {
      // Expose error details for debugging
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ ...result, debug: result.error });
    }
    res.status(STATUS.OK).json(result);
  } catch (err) {
    console.error('Login error:', err);
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: "Login error", debug: String(err) });
  }
});

/**
 * Geschützte Beispielroute, nur mit gültigem JWT-Token erreichbar.
 * @param {import('express').Request} req - Express Request-Objekt.
 * @param {import('express').Response} res - Express Response-Objekt.
 * @return {Object} JSON mit Erfolg oder Fehlermeldung.
 */
router.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "This is a protected route" });
});

export default router;
