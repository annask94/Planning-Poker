"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSocket from "../../hooks/useSocket";
import MembersList, { MemberData } from "../../components/MembersList";

const Room = () => {
  const router = useRouter();
  const { room, role } = router.query as { room: string; role: string };
  const { socket, isConnected, transport } = useSocket("http://localhost:5000");
  const [members, setMembers] = useState<MemberData[]>([]);
  const [taskDescription, setTaskDescription] = useState("");

  useEffect(() => {
    if (socket && room) {
      socket.emit("join-room", room);
      socket.on("room-joined", (members: MemberData[]) => {
        setMembers(members);
      });
    }

    return () => {
      if (socket) {
        socket.off("room-joined");
      }
    };
  }, [socket, room]);

  const handleTaskDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTaskDescription(e.target.value);
  };

  const handleSubmitTask = () => {
    if (socket) {
      socket.emit("submit-task", taskDescription);
    }
  };

  return (
    <div>
      <h1>Room: {room}</h1>
      <h2>Status: {isConnected ? "connected" : "disconnected"}</h2>
      <h2>Transport: {transport}</h2>
      <h2>Members</h2>
      <MembersList />
      {role === "admin" ? (
        <div>
          <h2>Admin Controls</h2>
          <input
            type="text"
            value={taskDescription}
            onChange={handleTaskDescriptionChange}
            placeholder="Enter task description"
          />
          <button onClick={handleSubmitTask}>Submit Task</button>
        </div>
      ) : (
        <div>
          <h2>Task Description</h2>
          <p>{taskDescription}</p>
        </div>
      )}
    </div>
  );
};

export default Room;
