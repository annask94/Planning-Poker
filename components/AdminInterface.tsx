"use client";
import { useState, useEffect, useRef } from "react";
import MembersList from "@/components/MembersList";
import CustomBtn from "@/components/CustomBtn";
import ShareDescription from "./ShareDescription";
import { User } from "@prisma/client";
import { CardData } from "./CardSets";

interface AdminInterfaceProps {
  roomId: string;
  userId: string | null;
  roomName: string;
  nameAdmin: string | null;
  users: User[];
  socket: any;
  projectData: {
    projectDescription: string;
    taskDescription: string;
    taskId: string;
  } | null;
}

const AdminInterface = ({
  roomId,
  userId,
  roomName,
  nameAdmin,
  users,
  socket,
  projectData,
}: AdminInterfaceProps) => {
  const [projectDescription, setProjectDescription] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [sharedProjectDescription, setSharedProjectDescription] = useState("");
  const [sharedTaskDescription, setSharedTaskDescription] = useState("");
  const [isShared, setIsShared] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);

  const sharedTaskId = useRef<string | null>(null);

  interface SharedDescription {
    projectDescription: string;
    taskDescription: string;
    taskId: string;
  }

  useEffect(() => {
    if (projectData) {
      setSharedProjectDescription(projectData.projectDescription);
      setSharedTaskDescription(projectData.taskDescription);
      sharedTaskId.current = projectData.taskId;
      setIsShared(true);
    }

    socket.on(
      "project-shared",
      ({ projectDescription, taskDescription, taskId }: SharedDescription) => {
        +console.log(
          "Received project-shared event:",
          projectDescription,
          taskDescription,
          taskId
        );
        setSharedProjectDescription(projectDescription);
        setSharedTaskDescription(taskDescription);
        sharedTaskId.current = taskId;
        setIsShared(true);
      }
    );

    return () => {
      socket.off("project-shared");
    };
  }, [socket, projectData]);

  const handleShare = () => {
    console.log("Emitting share-project event:", {
      roomId,
      projectDescription,
      taskDescription,
    });
    socket.emit("share-project", {
      roomId,
      projectDescription,
      taskDescription,
    });
    setIsShared(true);
  };

  const handleEstimate = () => {
    if (selectedCard && sharedTaskId.current) {
      console.log("Emitting estimate event:", {
        roomId,
        pickedCard: selectedCard.figure,
        taskId: sharedTaskId.current,
      });
      socket.emit("estimate", {
        roomId,
        pickedCard: selectedCard.figure,
        taskId: sharedTaskId.current,
      });
    } else {
      console.error("No card selected or taskId not available");
    }
  };
  return (
    <>
      <section className="roomBoard grid grid-cols-2fr-5fr-3fr items-start justify-items-stretch h-full min-h-screen">
        <section className="flex flex-col gap-6 p-4 items-center justify-start min-h-full btn_component_blue text-white text-center">
          <h2>Hi {nameAdmin}!</h2>
          <p>Today you are the Admin!</p>
          <p>You are in the {roomName} Room </p>
          <p>{sharedTaskId.current}</p>
          <div className="border border-white">
            <p className="font-semibold">
              Copy the room ID to invite other guests
            </p>
            <p>{roomId}</p>
          </div>
          <button type="button">Leave room</button>
        </section>

        {isShared ? (
          <ShareDescription
            projectDescription={sharedProjectDescription}
            taskDescription={sharedTaskDescription}
            handleEstimate={handleEstimate}
            onCardSelect={setSelectedCard}
          />
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleShare();
            }}
            className="flex flex-col md:gap-6 gap-2 mt-4 mb-4 justify-center items-center"
          >
            <label htmlFor="projectDescription" className="text-l md:text-2xl">
              Project description
            </label>
            <textarea
              id="projectDescription"
              name="projectDesc"
              cols={30}
              placeholder="Brief description of the project for better task complexity estimation. Use max 80 words."
              className="task_description rounded-md border-2 border-gray-300 outline-none p-2
                  md:w-[40vw] h-[40vh] md:h-[20vh]"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
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
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
            <CustomBtn type="submit" text="Share" />
          </form>
        )}
        <MembersList users={users} />
      </section>
    </>
  );
};

export default AdminInterface;
