const { expect } = require('chai');
const io = require('socket.io-client');
const http = require('http');
const { app, server } = require('../server');

describe('Socket.IO Server', () => {
    let clientSocket;

    before((done) => {
        server.listen(3001, () => {
            done();
        });
    });

    after(() => {
        server.close();
    });

    beforeEach((done) => {
        clientSocket = io('http://localhost:3001', {
            reconnection: false,
        });
        clientSocket.on('connect', () => {
            done();
        });
    });

    afterEach(() => {
        if (clientSocket.connected) {
            clientSocket.disconnect();
        }
    });

    it('should allow a user to create a room', (done) => {
        const roomId = 'test-room';
        clientSocket.emit('create-room', roomId);
        clientSocket.on('room-created', (createdRoomId) => {
            expect(createdRoomId).to.equal(roomId);
            done();
        });
    });

    it('should allow a user to join an existing room', (done) => {
        const roomId = 'test-room-2';
        const teacherSocket = io('http://localhost:3001');
        teacherSocket.on('connect', () => {
            teacherSocket.emit('create-room', roomId);
            teacherSocket.on('room-created', () => {
                const studentSocket = io('http://localhost:3001');
                studentSocket.on('connect', () => {
                    studentSocket.emit('join-room', roomId);
                    studentSocket.on('room-joined', (joinedRoomId) => {
                        expect(joinedRoomId).to.equal(roomId);
                        teacherSocket.disconnect();
                        studentSocket.disconnect();
                        done();
                    });
                });
            });
        });
    });

    it('should not allow a user to join a non-existent room', (done) => {
        const roomId = 'non-existent-room';
        clientSocket.emit('join-room', roomId);
        clientSocket.on('join-error', (errorRoomId) => {
            expect(errorRoomId).to.equal(roomId);
            done();
        });
    });

    it('should broadcast code changes to other clients in the room', (done) => {
        const roomId = 'test-room-3';
        const code = 'console.log("hello")';

        const teacherSocket = io('http://localhost:3001');
        teacherSocket.on('connect', () => {
            teacherSocket.emit('create-room', roomId);

            const studentSocket = io('http://localhost:3001');
            studentSocket.on('connect', () => {
                studentSocket.emit('join-room', roomId);
                studentSocket.on('room-joined', () => {
                    studentSocket.on('code-update', (receivedCode) => {
                        expect(receivedCode).to.equal(code);
                        teacherSocket.disconnect();
                        studentSocket.disconnect();
                        done();
                    });
                    teacherSocket.emit('code-change', { roomId, code });
                });
            });
        });
    });
});
