"use client";

import { useEffect, useState } from "react";
import useSocket from "@/hooks/useSocket";
import MembersList, { MemberData } from "@/components/MembersList";
import CardSet from "@/components/CardSets";
import CustomBtn from "@/components/CustomBtn";
import RoomTitle from "@/components/RoomTitle";

const mockRoom = "123";
const mockRole = "admin";

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
      <section className="roomBoard grid grid-cols-1fr-2fr-1fr m-4 items-start justify-items-center">
        <RoomTitle
          memberName="Michael"
          memberRole={mockRole}
          roomName={mockRoom}
        />
        <form className="flex flex-col md:gap-8 gap-4 justify-center items-center">
          <label htmlFor="projectkDescription" className="text-l md:text-2xl">
            Project description
          </label>
          <textarea
            id="projectDescription"
            name="projectDesc"
            cols={30}
            placeholder="Brief description of the project for better task complexity estimation. Use max 80 words."
            className="task_description rounded-md border-2 border-gray-300 outline-none p-2
                  md:w-[40vw] h-[40vh] md:h-[20vh]"
          />
          <label htmlFor="taskDescription" className="text-l md:text-2xl">
            Describe the task
          </label>
          <textarea
            id="taskDescription"
            name="prompt"
            cols={30}
            placeholder="Use max 150 words. Be clear and specific, include key details, describe goals and challenges, use actionable language, and provide context if needed..."
            className="task_description rounded-md border-2 border-gray-300 outline-none p-2
                  md:w-[40vw] h-[40vh] md:h-[20vh]"
          />
          <CustomBtn type="button" text="Share" />
          <CardSet cardClassName="smaller_card" />
          <CustomBtn type="submit" text="Estimate" />
        </form>
        <MembersList />
      </section>
    </>
  );
};

export default Room;
