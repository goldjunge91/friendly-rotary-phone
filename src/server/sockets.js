

export default function (io) {
  const rooms = new Set();

  io.on("connection", (socket) => {
    // ...existing code...
    socket.on("create-room", (roomId) => {
      rooms.add(roomId);
      socket.join(roomId);
      socket.emit("room-created", roomId);
    });
    socket.on("join-room", (roomId) => {
      if (rooms.has(roomId)) {
        socket.join(roomId);
        socket.emit("room-joined", roomId);
      } else {
        socket.emit("join-error", roomId);
      }
    });
    socket.on("code-change", (data) => {
      socket.to(data.roomId).emit("code-update", data.code);
    });
    socket.on("disconnect", () => {
      // ...existing code...
    });
  });
}
