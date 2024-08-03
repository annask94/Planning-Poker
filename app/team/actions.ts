"use server";

import prisma from "@/lib/db";

export async function createRoom(formData: FormData) {
  const nameRoom = formData.get("nameRoom") as string;
  const nameAdmin = formData.get("nameAdmin") as string;

  if (!nameRoom || !nameAdmin) {
    throw new Error("Room name and admin name are required");
  }

  const room = await prisma.room.create({
    data: {
      name: nameRoom,
      users: {
        create: {
          name: nameAdmin,
          role: "admin",
        },
      },
    },
    include: {
      users: true,
    },
  });

  const adminUser = room.users[0];

  return { roomId: room.id, userId: adminUser.id };
}

export async function joinRoom(formData: FormData) {
  const roomId = formData.get("roomNumber") as string;
  const nameGuest = formData.get("nameGuest") as string;

  if (!roomId || !nameGuest) {
    throw new Error("Room ID and guest name are required");
  }

  const room = await prisma.room.findUnique({
    where: { id: roomId },
  });

  if (!room) {
    throw new Error("Room not found");
  }

  const user = await prisma.user.create({
    data: {
      name: nameGuest,
      role: "guest",
      roomId: roomId,
    },
  });

  return { roomId, userId: user.id };
}
