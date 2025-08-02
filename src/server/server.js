

/**
 * Initialisiert Express, HTTP-Server und Socket.IO.
 */

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import http from "http";
import { Server as SocketIoServer } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
const PORT = process.env.VITE_SOCKET_SERVER_PORT;

/**
 * Express App-Instanz
 * @type {import('express').Express}
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

/**
 * Ein HTTP-Server (server) wird mit dieser App erzeugt.
 * @type {import('http').Server}
 */

const server = http.createServer(app);
const io = new SocketIoServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});



app.use(express.static(__dirname));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));


import authRoutes from "./api/auth-routes.js";
app.use("/api", authRoutes);

import sockets from "./sockets.js";
sockets(io);

/**
 * Der Server wird nur gestartet, wenn die Datei direkt mit
 *   node src/server/server.js
 * ausgeführt wird – also nicht, wenn sie als Modul von einer anderen Datei importiert wird.
 */

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  server.listen(PORT, () => {
    // ...existing code...
  });
}

/**
 * Exportiert die App-, Server- und Socket.IO-Instanzen.
 * @return {Object} Enthält 'app', 'server' und 'io'.
 */
export { app, server, io };