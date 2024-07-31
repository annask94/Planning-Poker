"use client";

import { useEffect, useState } from "react";
import useSocket from "@/hooks/useSocket";
import AdminInterface from "@/components/AdminInterface";
import GuestInterface from "@/components/GuestInterface";
import { User } from "@prisma/client";

interface RoomParams {
  params: {
    roomId: string;
  };
}

interface ProjectData {
  projectDescription: string;
  taskDescription: string;
  taskId: string;
}

interface RoomJoinedResponse {
  users: User[];
  roomName: string;
  projectData?: ProjectData;
}

const Room = ({ params }: RoomParams) => {
  const { roomId } = params;
  const { socket, isConnected, transport } = useSocket("http://localhost:5000");
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [roomName, setRoomName] = useState<string>("");
  const [projectData, setProjectData] = useState<ProjectData | null>(null);

  useEffect(() => {
    if (socket && isConnected) {
      const storedRole = sessionStorage.getItem("userRole");
      const storedName = sessionStorage.getItem("userName");
      setUserRole(storedRole);
      setUserName(storedName);

      console.log("Emitting join-room event");
      socket.emit("join-room", {
        roomId,
        userRole: storedRole,
        userName: storedName,
      });

      socket.on("room-joined", ({ users, roomName, projectData }) => {
        console.log("Room joined:", users, roomName, projectData);
        setUsers(users);
        setRoomName(roomName);
        if (projectData) {
          setProjectData(projectData);
        }
      });

      socket.on("user-joined", ({ users }) => {
        console.log("User joined:", users);
        setUsers(users);
      });

      return () => {
        socket.off("room-joined");
        socket.off("user-joined");
      };
    }
  }, [socket, isConnected, roomId]);

  if (userRole === "admin") {
    return (
      <AdminInterface
        roomId={roomId}
        nameAdmin={userName}
        roomName={roomName}
        users={users}
        socket={socket}
        projectData={projectData}
      />
    );
  }

  if (userRole === "guest") {
    return (
      <GuestInterface
        roomId={roomId}
        nameGuest={userName}
        roomName={roomName}
        users={users}
        socket={socket}
        projectData={projectData}
      />
    );
  }

  return <div>Loading...</div>;
};

export default Room;
