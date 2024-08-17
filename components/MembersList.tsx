"use client";
import React, { useEffect, useState } from "react";
import { User } from "@prisma/client";

interface MemberCardProps {
  userName: string;
  userRole: string;
  ready: string;
  pickedCard: string | null;
  displayCard: string;
}

const MemberCard = ({
  userName,
  userRole,
  ready,
  pickedCard,
  displayCard,
}: MemberCardProps) => (
  <div className="grid grid-cols-3 items-center bg-white p-4 member_card self-center rounded-xl">
    <div>
      <h2 className="text-lg">{userName}</h2>
      <p>{userRole}</p>
    </div>
    <div className={displayCard === "display" ? "opacity-100" : "opacity-0"}>
      <h2 className="text-lg border-y-pink-400">{pickedCard}</h2>
    </div>
    <div className="member_circle">
      <div
        className={`member_ready ${
          ready === "estimated" ? "opacity-100" : "opacity-0"
        }`}
      ></div>
    </div>
  </div>
);

interface MemberListProps {
  users: User[];
}

const MembersList = ({ users }: MemberListProps) => {
  const usersData = users.map((user) => ({
    userName: user.name,
    userRole: user.role,
    ready: user.ready,
    pickedCard: user.currentCard,
    displayCard: user.displayCard,
  }));

  return (
    <section className="flex flex-col mt-6 items-center">
      <h2 className="team_title">Team</h2>
      <div className="grid grid-cols-1 gap-4 mt-4 justify-items-center items-center members_list rounded-2xl overflow-y-auto max-h-[90vh] w-[25vw]">
        {users.map((user, index) => (
          <MemberCard
            key={index}
            userName={user.name}
            userRole={user.role}
            ready={user.ready}
            pickedCard={user.currentCard}
            displayCard={user.displayCard}
          />
        ))}
      </div>
    </section>
  );
};

export default MembersList;
