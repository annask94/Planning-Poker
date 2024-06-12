"use client";
import { useState } from "react";
import CustomBtn from "@/components/CustomBtn";
import { CustomBtnBlue, LabelInput } from "@/components/CreateJoinForm";

export default function Home() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showJoinForm, setShowJoinForm] = useState(false);

  const toggleCreateForm = () => {
    setShowCreateForm(!showCreateForm);
    setShowJoinForm(false); // Hide join form when creating a new room
  };

  const toggleJoinForm = () => {
    setShowJoinForm(!showJoinForm);
    setShowCreateForm(false); // Hide create form when joining a room
  };

  return (
    <main className="flex justify-center items-center gap-20 flex-row">
      <div className="flex flex-col items-center gap-3">
        <CustomBtn type="button" text="Create" onClick={toggleCreateForm} />
        {showCreateForm && (
          <form className="flex flex-col">
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
          <form className="flex flex-col">
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
    </main>
  );
}
