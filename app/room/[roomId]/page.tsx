"use client";

import { useEffect, useState } from "react";
import useSocket from "@/hooks/useSocket";
import { useRouter } from "next/router";
import MembersList, { MemberData } from "@/components/MembersList";
import AdminInterface from "@/components/AdminInterface";
import GuestInterface from "@/components/GuestInterface";

interface RoomParams {
  params: {
    roomId: string;
  };
}

const Room = ({ params }: RoomParams) => {
  const { roomId } = params;
  const { socket, isConnected, transport } = useSocket("http://localhost:5000");
  const [members, setMembers] = useState<MemberData[]>([]);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    if (socket && isConnected) {
      const storedRole = sessionStorage.getItem("userRole");
      const storedName = sessionStorage.getItem("userName");
      setUserRole(storedRole);
      setUserName(storedName);

      socket.emit("join-room", {
        roomId,
        userRole: storedRole,
        userName: storedName,
      });
      socket.on("room-joined", (members: MemberData[]) => {
        setMembers(members);
      });

      return () => {
        socket.off("room-joined");
      };
    }
  }, [socket, isConnected, roomId]);

  if (userRole === "admin") {
    return (
      <AdminInterface roomId={roomId} members={members} nameAdmin={userName} />
    );
  }

  if (userRole === "guest") {
    return (
      <GuestInterface roomId={roomId} members={members} nameGuest={userName} />
    );
  }

  return <div>Loading...</div>;
};

export default Room;
