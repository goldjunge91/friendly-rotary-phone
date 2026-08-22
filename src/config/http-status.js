// src/config/http-status.js
// Enthält Standard-HTTP-Statuscodes für API-Antworten
// Quelle: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

module.exports = {
  OK: 200, // Erfolg
  CREATED: 201, // Ressource erfolgreich erstellt
  NO_CONTENT: 204, // Kein Inhalt
  BAD_REQUEST: 400, // Fehlerhafte Anfrage
  UNAUTHORIZED: 401, // Nicht autorisiert
  FORBIDDEN: 403, // Zugriff verweigert
  NOT_FOUND: 404, // Nicht gefunden
  CONFLICT: 409, // Konflikt (z.B. Duplikat)
  UNPROCESSABLE_ENTITY: 422, // Validierungsfehler
  INTERNAL_SERVER_ERROR: 500, // Serverfehler
};
