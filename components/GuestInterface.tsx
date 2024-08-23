"use client";
import React, { useEffect, useState, useRef } from "react";
import MembersList from "@/components/MembersList";
import { User } from "@prisma/client";
import ShareDescription from "./ShareDescription";
import { CardData } from "./CardSets";
import AIEstimateShare from "./AIEstimateShare";

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

interface Estimates {
  card: string;
  userName: string;
}
interface AiSharedEstimate {
  aiCard: string;
  aiDescription: string;
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
  const [aiIsShared, setAiIsShared] = useState(false);
  const [aiEstimateCard, setAiEstimateCard] = useState("");
  const [aiEstimateDescription, setAiEstimateDescription] = useState("");
  const [isEstimateButtonDisabled, setEstimateButtonDisabled] = useState(false);

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

    socket.on(
      "aiEstimate-received",
      ({ aiCard, aiDescription }: AiSharedEstimate) => {
        setAiEstimateCard(aiCard);
        setAiEstimateDescription(aiDescription);
        setAiIsShared(true);
      }
    );

    return () => {
      socket.off("project-shared");
      socket.off("aiEstimate-received");
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
      setEstimateButtonDisabled(true);
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
      <div className="flex flex-col md:gap-4 gap-4 justify-center items-center mt-4">
        <h3 className="text-xl font-bold">Welcome to the {roomName} room!</h3>
        <p className="italic">You can view tasks and estimate.</p>
        {aiIsShared ? (
          <AIEstimateShare
            projectDescription={
              projectData?.projectDescription || sharedProjectDescription
            }
            taskDescription={
              projectData?.taskDescription || sharedTaskDescription
            }
            aiCard={aiEstimateCard}
            aiDescription={aiEstimateDescription}
          />
        ) : (
          <ShareDescription
            projectDescription={
              projectData?.projectDescription || sharedProjectDescription
            }
            taskDescription={
              projectData?.taskDescription || sharedTaskDescription
            }
            handleEstimate={handleEstimate}
            onCardSelect={setSelectedCard}
            disabled={isEstimateButtonDisabled}
          />
        )}
      </div>
      <MembersList users={users} />
    </section>
  );
};

export default GuestInterface;
