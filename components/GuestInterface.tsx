"use client";
import React, { useEffect, useState, useRef } from "react";
import MembersList from "@/components/MembersList";
import { User } from "@prisma/client";
import ShareDescription from "./ShareDescription";
import { CardData } from "./CardSets";

interface GuestInterfaceProps {
  roomId: string;
  userId: string | null;
  nameGuest: string | null;
  roomName: string;
  users: User[];
  socket: any;
  projectData: {
    projectDescription: string;
    taskDescription: string;
    taskId: string;
  } | null;
}

interface SharedDescription {
  projectDescription: string;
  taskDescription: string;
  taskId: string;
  handleEstimate: () => void;
  onCardSelect: () => void;
}

const GuestInterface = ({
  roomId,
  userId,
  nameGuest,
  roomName,
  users,
  socket,
  projectData,
}: GuestInterfaceProps) => {
  const [sharedProjectDescription, setSharedProjectDescription] = useState("");
  const [sharedTaskDescription, setSharedTaskDescription] = useState("");
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);

  const sharedTaskId = useRef<string | null>(null);

  useEffect(() => {
    socket.on(
      "project-shared",
      ({ projectDescription, taskDescription, taskId }: SharedDescription) => {
        setSharedProjectDescription(projectDescription);
        setSharedTaskDescription(taskDescription);
        sharedTaskId.current = taskId;
      }
    );

    return () => {
      socket.off("project-shared");
    };
  }, [socket]);

  const handleEstimate = () => {
    if (selectedCard) {
      console.log("Emitting estimate event:", {
        roomId,
        pickedCard: selectedCard.figure,
        taskId: projectData?.taskId || sharedTaskId.current,
        userId,
      });
      socket.emit("estimate", {
        roomId,
        pickedCard: selectedCard.figure,
        taskId: projectData?.taskId || sharedTaskId.current,
        userId,
      });
    } else {
      console.error("No card selected");
    }
  };

  return (
    <section className="roomBoard grid grid-cols-1fr-5fr-3fr gap-4 items-start justify-items-stretch min-h-screen w-full">
      <section className="flex flex-col gap-4 p-4 items-center justify-start min-h-full btn_component_blue text-white">
        <h2>Hi {nameGuest}!</h2>
        <p>Today you are the Guest!</p>
        <button type="button">Leave room</button>
      </section>
      <div className="flex flex-col md:gap-8 gap-4 justify-center items-center mt-4">
        <h2>Welcome to the {roomName} room!</h2>
        <p className="italic">You can view tasks and estimate.</p>
        <ShareDescription
          projectDescription={
            projectData?.projectDescription || sharedProjectDescription
          }
          taskDescription={
            projectData?.taskDescription || sharedTaskDescription
          }
          handleEstimate={handleEstimate}
          onCardSelect={setSelectedCard}
        />
      </div>
      <MembersList users={users} />
    </section>
  );
};

export default GuestInterface;
