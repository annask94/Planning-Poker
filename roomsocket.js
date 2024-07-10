const { createServer } = require("http");
const next = require("next");
const { Server } = require("socket.io");
import { createRoom, joinRoom } from "app/team/actions.ts";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 5000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(
      `Client connected: ${socket.id} from ${socket.handshake.headers.origin}`
    );

    socket.on("create-room", async (data, callback) => {
      const { nameRoom, nameAdmin } = data;

      try {
        const room = await createRoom(
          new FormData(Object.entries({ nameRoom, nameAdmin }))
        );
        socket.join(room.id);
        callback({ success: true, room });
        io.to(room.id).emit("room-joined", {
          userId: socket.id,
          userName: nameAdmin,
          role: "admin",
        });
      } catch (error) {
        callback({ success: false, error: error.message });
      }
    });

    socket.on("join-room", async (data, callback) => {
      const { roomId, nameGuest } = data;

      try {
        const user = await joinRoom(
          new FormData(Object.entries({ roomNumber: roomId, nameGuest }))
        );
        socket.join(roomId);
        callback({ success: true, user });
        io.to(roomId).emit("room-joined", {
          userId: socket.id,
          userName: nameGuest,
          role: "guest",
        });
      } catch (error) {
        callback({ success: false, error: error.message });
      }
    });

    socket.on("disconnect", (reason) => {
      console.log(`Client disconnected: ${socket.id} Reason: ${reason}`);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
