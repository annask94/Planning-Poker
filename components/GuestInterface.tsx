"use client";
import React, { useEffect, useState } from "react";
import MembersList from "@/components/MembersList";
import { User } from "@prisma/client";
import ShareDescription from "./ShareDescription";

interface GuestInterfaceProps {
  roomId: string;
  nameGuest: string | null;
  roomName: string;
  users: User[];
  socket: any;
}

interface SharedDescription {
  projectDescription: string;
  taskDescription: string;
}

const GuestInterface = ({
  roomId,
  nameGuest,
  roomName,
  users,
  socket,
}: GuestInterfaceProps) => {
  const [sharedProjectDescription, setSharedProjectDescription] = useState("");
  const [sharedTaskDescription, setSharedTaskDescription] = useState("");

  useEffect(() => {
    socket.on(
      "project-shared",
      ({ projectDescription, taskDescription }: SharedDescription) => {
        setSharedProjectDescription(projectDescription);
        setSharedTaskDescription(taskDescription);
      }
    );

    return () => {
      socket.off("project-shared");
    };
  }, [socket]);

  return (
    <section className="roomBoard grid grid-cols-2fr-5fr-3fr gap-4 items-start justify-items-stretch min-h-screen w-full">
      <section className="flex flex-col gap-4 p-4 items-center justify-start min-h-full btn_component_blue text-white">
        <h2>Hi {nameGuest}!</h2>
        <p>Today you are the Guest!</p>
        <button type="button">Leave room</button>
      </section>
      <div className="flex flex-col md:gap-8 gap-4 justify-center items-center mt-4">
        <h2>Welcome to the {roomName} room!</h2>
        <p className="italic">You can view tasks and estimate.</p>
        <ShareDescription
          projectDescription={sharedProjectDescription}
          taskDescription={sharedProjectDescription}
        />
      </div>
      <MembersList users={users} />
    </section>
  );
};

export default GuestInterface;
