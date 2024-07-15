const { createServer } = require("http");
const next = require("next");
const { Server } = require("socket.io");
const prisma = require("@/lib/db");

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

    socket.on("join-room", async ({ roomId, userRole, userName }) => {
      const users = await prisma.user.findMany({
        where: {
          roomId: roomId,
        },
      });
      socket.emit("room-joined", users);

      socket.join(roomId);
      socket.to(roomId).emit("user-joined", { userName, userRole });
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
