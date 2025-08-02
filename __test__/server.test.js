import { expect, describe, it, beforeAll, afterAll, beforeEach, afterEach } from 'vitest';
import io from 'socket.io-client';
import { server, io as serverIo } from '../src/server/server';

describe('Socket.IO Server', () => {
    let clientSocket;
    const sockets = [];

    beforeAll((done) => {
        server.listen(3001, () => {
            done();
        });
    });

    afterAll(() => {
        server.close();
        serverIo.close();
        sockets.forEach(s => {
            if (s && s.connected) s.disconnect();
        });
    });

    beforeEach((done) => {
        clientSocket = io('http://localhost:3001', {
            reconnection: false,
        });
        sockets.push(clientSocket);
        clientSocket.on('connect', () => {
            done();
        });
    });

    afterEach(() => {
        if (clientSocket && clientSocket.connected) {
            clientSocket.disconnect();
        }
    });

    it('should allow a user to create a room', (done) => {
        const roomId = 'test-room';
        clientSocket.emit('create-room', roomId);
        clientSocket.once('room-created', (createdRoomId) => {
            expect(createdRoomId).toBe(roomId);
            done();
        });
    });

    it('should allow a user to join an existing room', (done) => {
        const roomId = 'test-room-2';
        const teacherSocket = io('http://localhost:3001', { reconnection: false });
        sockets.push(teacherSocket);
        teacherSocket.once('connect', () => {
            teacherSocket.emit('create-room', roomId);
            teacherSocket.once('room-created', () => {
                const studentSocket = io('http://localhost:3001', { reconnection: false });
                sockets.push(studentSocket);
                studentSocket.once('connect', () => {
                    studentSocket.emit('join-room', roomId);
                    studentSocket.once('room-joined', (joinedRoomId) => {
                        expect(joinedRoomId).toBe(roomId);
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
        clientSocket.once('join-error', (errorRoomId) => {
            expect(errorRoomId).toBe(roomId);
            done();
        });
    });

    it('should broadcast code changes to other clients in the room', (done) => {
        const roomId = 'test-room-3';
        // ...existing code...

        const teacherSocket = io('http://localhost:3001', { reconnection: false });
        sockets.push(teacherSocket);
        teacherSocket.once('connect', () => {
            teacherSocket.emit('create-room', roomId);

            const studentSocket = io('http://localhost:3001', { reconnection: false });
            sockets.push(studentSocket);
            studentSocket.once('connect', () => {
                studentSocket.emit('join-room', roomId);
                studentSocket.once('room-joined', () => {
                    studentSocket.once('code-update', (receivedCode) => {
                        expect(receivedCode).toBe(code);
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
