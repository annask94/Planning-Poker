"use client";
import { useState, useEffect } from "react";
import MembersList from "@/components/MembersList";
import CardSet from "@/components/CardSets";
import CustomBtn from "@/components/CustomBtn";
import ShareDescription from "./ShareDescription";
import { User } from "@prisma/client";

interface AdminInterfaceProps {
  roomId: string;
  roomName: string;
  nameAdmin: string | null;
  users: User[];
  socket: any;
}

const AdminInterface = ({
  roomId,
  roomName,
  nameAdmin,
  users,
  socket,
}: AdminInterfaceProps) => {
  const [projectDescription, setProjectDescription] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [sharedProjectDescription, setSharedProjectDescription] = useState("");
  const [sharedTaskDescription, setSharedTaskDescription] = useState("");
  const [sharedTaskId, setSharedTaskId] = useState("");
  const [isShared, setIsShared] = useState(false);

  interface SharedDescription {
    projectDescription: string;
    taskDescription: string;
    taskId: string;
  }

  useEffect(() => {
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
        setSharedTaskId(taskId);
        setIsShared(true);
      }
    );

    return () => {
      socket.off("project-shared");
    };
  }, [socket]);

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
  return (
    <>
      <section className="roomBoard grid grid-cols-2fr-5fr-3fr items-start justify-items-stretch h-full min-h-screen">
        <section className="flex flex-col gap-6 p-4 items-center justify-start min-h-full btn_component_blue text-white text-center">
          <h2>Hi {nameAdmin}!</h2>
          <p>Today you are the Admin!</p>
          <p>You are in the {roomName} Room </p>
          <p>{sharedTaskId}</p>
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
