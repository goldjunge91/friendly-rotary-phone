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
app.use(express.json());

// Auth API routes
const { registerUser, loginUser } = require('./db/auth');

app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ success: false, message: 'Missing fields' });
  const result = await registerUser(email, password);
  res.json(result);
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ success: false, message: 'Missing fields' });
  const result = await loginUser(email, password);
  res.json(result);
});

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
