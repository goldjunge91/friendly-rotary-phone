import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

export function useCollaboration() {
  const [role, setRole] = useState(null); // 'teacher' or 'student'
  const [roomId, setRoomId] = useState('');
  const [connected, setConnected] = useState(false);
  const [teacherCode, setTeacherCode] = useState('');
  const [studentCode, setStudentCode] = useState('');
  const [breakpoints, setBreakpoints] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    const socketServerUrl = import.meta.env.VITE_SOCKET_SERVER_URL || `http://localhost:${import.meta.env.VITE_SOCKET_SERVER_PORT || 3000}`;
    console.log("Connecting to socket server:", socketServerUrl);
    const socket = io(socketServerUrl);
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Socket connected');
      setConnected(true);
    });
    socket.on('disconnect', () => {
      console.log('Socket disconnected');
      setConnected(false);
    });
    socket.on('room-created', (id) => {
      console.log('Room created:', id);
      setRoomId(id);
    });
    socket.on('room-joined', (id) => {
      console.log('Room joined:', id);
      setRoomId(id);
    });
    socket.on('join-error', () => {
      console.log('Join error');
      setRoomId('');
    });
    socket.on('code-update', (code) => {
      console.log('Code update:', code);
      setTeacherCode(code);
    });
    socket.on('breakpoint-set', (bps) => {
      console.log('Breakpoints set:', bps);
      setBreakpoints(bps);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Teacher starts session
  function startSession() {
    setRole('teacher');
    const id = Math.random().toString(36).substring(7);
    setRoomId(id);
    socketRef.current.emit('create-room', id);
  }

  // Student joins session
  function joinSession(id) {
    setRole('student');
    setRoomId(id);
    socketRef.current.emit('join-room', id);
  }

  // Teacher updates code
  function updateTeacherCode(code) {
    setTeacherCode(code);
    socketRef.current.emit('code-change', { roomId, code });
  }

  // Teacher sets breakpoints
  function setTeacherBreakpoints(bps) {
    setBreakpoints(bps);
    socketRef.current.emit('breakpoint-set', { roomId, breakpoints: bps });
  }

  // Student updates their code
  function updateStudentCode(code) {
    setStudentCode(code);
  }

  return {
    role,
    roomId,
    connected,
    teacherCode,
    studentCode,
    breakpoints,
    startSession,
    joinSession,
    updateTeacherCode,
    setTeacherBreakpoints,
    updateStudentCode,
  };
}
