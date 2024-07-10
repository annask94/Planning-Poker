"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import CustomBtn from "@/components/CustomBtn";
import { CustomBtnBlue, LabelInput } from "@/components/CreateJoinForm";
import { createRoom, joinRoom } from "./actions";

export default function Home() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showJoinForm, setShowJoinForm] = useState(false);
  const router = useRouter();

  const toggleCreateForm = () => {
    setShowCreateForm(!showCreateForm);
    setShowJoinForm(false);
  };

  const toggleJoinForm = () => {
    setShowJoinForm(!showJoinForm);
    setShowCreateForm(false);
  };

  const handleCreateRoom = async (formData: FormData) => {
    const roomId = await createRoom(formData);
    sessionStorage.setItem("userRole", "admin");
    sessionStorage.setItem("userName", formData.get("nameAdmin") as string);
    router.push(`/room/${roomId}`);
  };

  const handleJoinRoom = async (formData: FormData) => {
    const roomId = await joinRoom(formData);
    sessionStorage.setItem("userRole", "guest");
    sessionStorage.setItem("userName", formData.get("nameGuest") as string);
    router.push(`/room/${roomId}`);
  };

  return (
    <main className="flex flex-col justify-center items-center md:gap-20 gap-10 mx-6">
      <section className="flex flex-col text-center">
        <h1 className="md:text-3xl text-2xl font-bold mb-8">
          Create or Join a Virtual Room
        </h1>
        <p className="md:text-xl mb-2">
          Create a room to become the admin and invite your team with a room
          number. As the admin, you will manage task descriptions.
        </p>
        <p className="md:text-xl">
          To join an existing room, use the room number from your admin or team
          leader. Collaborate and estimate task complexity efficiently.
        </p>
      </section>
      <section className="flex justify-center items-center md:gap-20 gap-10 md:flex-row flex-col">
        <div className="flex flex-col items-center gap-3">
          <CustomBtn type="button" text="Create" onClick={toggleCreateForm} />
          {showCreateForm && (
            <form
              action={handleCreateRoom}
              className="flex flex-col items-center"
            >
              <LabelInput
                id="nameRoom"
                labelText="Room name"
                nameInput="nameRoom"
                placeholderInput="Room/team name"
              />
              <LabelInput
                id="nameAdmin"
                labelText="Your name"
                nameInput="nameAdmin"
                placeholderInput="Enter your name"
              />

              <CustomBtnBlue type="submit" text="Create room" />
            </form>
          )}
        </div>
        <div className="flex flex-col items-center gap-3">
          <CustomBtn type="button" text="Join" onClick={toggleJoinForm} />
          {showJoinForm && (
            <form action={handleJoinRoom} className="flex flex-col">
              <LabelInput
                id="roomNumber"
                labelText="Room number"
                nameInput="roomNumber"
                placeholderInput="Enter room number provided by your admin"
              />
              <LabelInput
                id="nameGuest"
                labelText="Your name"
                nameInput="nameGuest"
                placeholderInput="Enter your name"
              />
              <CustomBtnBlue type="submit" text="Join room" />
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
