const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const roomId = "clyrs8hr90000r6v8tcey1xxo"; // Ustaw ID pokoju, które chcesz przetestować
  console.log("Fetching users for room:", roomId);

  const users = await prisma.user.findMany({
    where: { roomId: roomId },
  });

  console.log("Fetched users:", users);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
