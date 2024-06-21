"use client";

import { useEffect, useState } from "react";
import useSocket from "@/hooks/useSocket";
import MembersList, { MemberData } from "@/components/MembersList";
import CardSet from "@/components/CardSets";
import CustomBtn from "@/components/CustomBtn";

const mockRoom = "123";
const mockRole = "admin`";

const Room = () => {
  const { socket, isConnected, transport } = useSocket("http://localhost:5000");
  const [members, setMembers] = useState<MemberData[]>([]);
  const [taskDescription, setTaskDescription] = useState("");

  useEffect(() => {
    if (socket) {
      // Join the hardcoded room
      socket.emit("join-room", mockRoom);
      socket.on("room-joined", (members: MemberData[]) => {
        setMembers(members);
      });

      // Mock initial members, to przenieść na poziom komponentu bo każdy w pokoju i tak będzie miał taką samą listę niezależnie od roli
      const initialMembers: MemberData[] = [
        { id: 1, name: "Michael", role: "admin" },
        { id: 2, name: "Nancy", role: "guest" },
        { id: 3, name: "Shawn", role: "guest" },
        { id: 4, name: "Chad", role: "guest" },
        { id: 5, name: "Lilly", role: "guest" },
        { id: 6, name: "Anna", role: "guest" },
        { id: 6, name: "Anna", role: "guest" },
      ];
      setMembers(initialMembers);
    }

    return () => {
      if (socket) {
        socket.off("room-joined");
      }
    };
  }, [socket]);

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
    <>
      <section className="flex gap-4 m-2">
        <h2>Michael</h2>
        <h2>Role: Admin</h2>
        <h2>Room: {mockRoom}</h2>
      </section>
      <section className="roomBoard grid grid-cols-2 min-h-[80vh] m-4 items-center justify-center">
        <form className="flex flex-col md:gap-8 gap-4 justify-center items-center mx-3">
          <label htmlFor="taskDescription" className="text-xl md:text-4xl">
            Describe the task
          </label>
          <textarea
            id="taskDescription"
            name="prompt"
            rows={5}
            cols={50}
            placeholder="Use max 150 words. Be clear and specific, include key details, describe goals and challenges, use actionable language, and provide context if needed..."
            className="task_description rounded-md border-2 border-gray-300 outline-none p-2
                  md:w-[60vw] h-[40vh] md:h-[30vh]"
          />
          <CustomBtn type="button" text="Share" />
          <h2 className="text-xl md:text-4xl">Pick a card</h2>
          <CardSet />
          <CustomBtn type="submit" text="Estimate" />
        </form>
        <MembersList />
      </section>
    </>
  );
};

export default Room;
