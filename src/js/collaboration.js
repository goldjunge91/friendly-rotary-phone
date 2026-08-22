let isTeacher = false;

document.addEventListener('DOMContentLoaded', () => {
    const socket = io();

    const roomIdInput = document.getElementById('room-id-input');
    const joinBtn = document.getElementById('join-btn');
    const startBtn = document.getElementById('start-btn');

    startBtn.addEventListener('click', () => {
        isTeacher = true;
        const roomId = Math.random().toString(36).substring(7);
        socket.emit('create-room', roomId);
        roomIdInput.value = roomId;
        alert(`Session started. Room ID: ${roomId}`);

        if (window.editor) {
            window.editor.on('change', (instance) => {
                const code = instance.getValue();
                socket.emit('code-change', { roomId, code });
            });
        }
    });

    joinBtn.addEventListener('click', () => {
        const roomId = roomIdInput.value;
        if (roomId) {
            socket.emit('join-room', roomId);
        }
    });

    socket.on('room-created', (roomId) => {
        console.log(`Room ${roomId} created.`);
    });

    socket.on('room-joined', (roomId) => {
        console.log(`Joined room ${roomId}.`);
    });

    socket.on('join-error', (roomId) => {
        alert(`Error joining room ${roomId}. Room not found.`);
    });

    socket.on('code-update', (code) => {
        if (!isTeacher && window.editor) {
            const cursor = window.editor.getCursor();
            window.editor.setValue(code);
            window.editor.setCursor(cursor);
        }
    });

    // Visually indicate if the user is a student
    socket.on('room-joined', () => {
        if (!isTeacher) {
            document.body.style.backgroundColor = '#f0f8ff'; // A light blue background for students
        }
    });
});
