const { createServer } = require("http");
const next = require("next");
const { Server } = require("socket.io");
const { PrismaClient } = require("@prisma/client");
const { OpenAI } = require("openai");

const prisma = new PrismaClient();
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

    socket.on("join-room", async ({ roomId, userRole, userName, userId }) => {
      console.log(
        `User ${userName} with role ${userRole} and user ID ${userId} joined room ${roomId}`
      );

      try {
        console.log("Fetching users for room:", roomId);
        const users = await prisma.user.findMany({
          where: { roomId: roomId },
        });
        console.log("Fetched users:", users);

        if (!users || users.length === 0) {
          console.error("No users found for room:", roomId);
        }

        console.log("Fetching roomName for room:", roomId);
        const room = await prisma.room.findUnique({
          where: { id: roomId },
          select: { name: true },
        });
        console.log("Fetched room details:", room);

        console.log("Fetching latest project for room:", roomId);
        const latestProject = await prisma.project.findFirst({
          where: { roomId: roomId },
          orderBy: { createdAt: "desc" },
          include: { tasks: true },
        });

        let projectData = null;
        if (latestProject) {
          projectData = {
            projectDescription: latestProject.content,
            taskDescription: latestProject.tasks[0].content,
            taskId: latestProject.tasks[0].id,
          };
          console.log(
            projectData.projectDescription,
            projectData.taskDescription,
            projectData.taskId
          );
        }

        socket.emit("room-joined", {
          users,
          roomName: room?.name,
          projectData,
        });
        socket.join(roomId);
        io.to(roomId).emit("user-joined", { users });
      } catch (error) {
        console.error("Error fetching users or room details:", error);
      }
    });

    socket.on(
      "share-project",
      async ({ roomId, projectDescription, taskDescription }) => {
        console.log(
          "Received share-project event:",
          roomId,
          projectDescription,
          taskDescription
        );
        try {
          const project = await prisma.project.create({
            data: {
              content: projectDescription,
              roomId: roomId,
              tasks: {
                create: { content: taskDescription },
              },
            },
            include: { tasks: true },
          });

          console.log(
            "Project shared:",
            project.content,
            project.tasks[0].content,
            project.tasks[0].id
          );

          io.to(roomId).emit("project-shared", {
            projectDescription: project.content,
            taskDescription: project.tasks[0].content,
            taskId: project.tasks[0].id,
          });
        } catch (error) {
          console.error("Error sharing project:", error);
        }
      }
    );

    socket.on("estimate", async ({ pickedCard, roomId, taskId, userId }) => {
      console.log("Received estimate event:", pickedCard, roomId, taskId);
      try {
        const estimate = await prisma.estimate.create({
          data: {
            card: pickedCard,
            Task: {
              connect: {
                id: taskId,
              },
            },
            User: {
              connect: {
                id: userId,
              },
            },
          },
        });

        const updatedUser = await prisma.user.update({
          where: { id: userId },
          data: { ready: "estimated" },
        });

        console.log("Estimate shared:", estimate.card, estimate.taskID);

        io.to(roomId).emit("estimate-shared", updatedUser);
      } catch (error) {
        console.error("Error sharing estimate:", error);
      }
    });

    socket.on(
      "aiEstimate",
      async ({ roomId, taskId, taskDescription, projectDescription }) => {
        console.log("Received estimate event:", taskId);

        const openai = new OpenAI({
          apiKey: process.env.OPENAI_KEY,
        });

        try {
          const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            max_tokens: 150,
            temperature: 0.5,
            stream: false,
            messages: [
              {
                role: "user",
                content: `Based on the provided project description '${projectDescription}' and task description '${taskDescription}', please estimate the effort required using the Scrum poker technique. Consider factors such as the complexity of implementation, dependencies, and potential risks. Return an estimate as a JSON in a structured format: { "aiEstimate": "5", "aiDescription": "Explanation here..." }. Make the Explanation maximum of 50 words.`,
              },
            ],
          });

          if (
            completion.choices.length > 0 &&
            completion.choices[0].message.content
          ) {
            const aiResponseData = JSON.parse(
              completion.choices[0].message.content
            );
            const aiCard = aiResponseData.aiEstimate;
            const aiDescription = aiResponseData.aiDescription;

            const aiEstimate = await prisma.aIEstimate.create({
              data: {
                card: aiCard,
                description: aiDescription,
                Task: {
                  connect: {
                    id: taskId,
                  },
                },
              },
            });

            const allEstimates = await prisma.estimate.findMany({
              where: { taskID: taskId },
              include: {
                User: true,
              },
            });

            console.log("Users estimates:", allEstimates);

            console.log("AiEstimate received:", aiCard, aiDescription);

            const allEstimatesTransform = allEstimates.map((estimate) => ({
              card: estimate.card,
              userName: estimate.User.name,
            }));

            console.log("Users estimates transformed:", allEstimatesTransform);

            io.to(roomId).emit("aiEstimate-received", {
              aiCard,
              aiDescription,
              allEstimatesTransform,
            });
          } else {
            console.error("No valid response from AI.");
            io.to(roomId).emit(
              "aiEstimate-error",
              "No valid response from AI."
            );
          }
        } catch (error) {
          console.error("Error in aiEstimate:", error);
          io.to(roomId).emit(
            "aiEstimate-error",
            "Error processing AI completion."
          );
        }
      }
    );

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
