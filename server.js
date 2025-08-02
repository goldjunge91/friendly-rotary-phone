const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.VITE_SOCKET_SERVER_PORT || process.env.PORT || 4000;

app.use(express.static(__dirname));

const rooms = new Set();

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('create-room', (roomId) => {
        rooms.add(roomId);
        socket.join(roomId);
        socket.emit('room-created', roomId);
        console.log(`Room ${roomId} created`);
    });

    socket.on('join-room', (roomId) => {
        if (rooms.has(roomId)) {
            socket.join(roomId);
            socket.emit('room-joined', roomId);
            console.log(`User joined room ${roomId}`);
        } else {
            socket.emit('join-error', roomId);
            console.log(`User failed to join room ${roomId}`);
        }
    });

    socket.on('code-change', (data) => {
        socket.to(data.roomId).emit('code-update', data.code);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

if (require.main === module) {
    server.listen(PORT, () => {
        console.log(`listening on *:${PORT}`);
    });
}

module.exports = { app, server, io };
