import React from "react";
import MembersList, { MemberData } from "@/components/MembersList";
import RoomTitle from "@/components/RoomTitle";

interface GuestInterfaceProps {
  roomId: string;
  nameGuest: string | null;
  members: MemberData[];
}

const GuestInterface = ({
  roomId,
  nameGuest,
  members,
}: GuestInterfaceProps) => {
  return (
    <section className="roomBoard grid grid-cols-1fr-2fr-1fr m-4 items-start justify-items-center">
      <RoomTitle
        memberName={nameGuest || "Guest"}
        memberRole="guest"
        roomName={roomId}
      />
      <div className="flex flex-col md:gap-8 gap-4 justify-center items-center">
        <h2>Welcome to the room!</h2>
        <p>You can view tasks and interact with the team.</p>
      </div>
      <MembersList />
    </section>
  );
};

export default GuestInterface;
