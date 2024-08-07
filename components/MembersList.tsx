"use client";
import React, { useEffect, useState } from "react";
import { User } from "@prisma/client";

interface MemberCardProps {
  userName: string;
  userRole: string;
  ready: string;
}
const MemberCard = ({ userName, userRole, ready }: MemberCardProps) => (
  <div className="grid grid-cols-2 items-center bg-white p-4 member_card self-center rounded-xl">
    <div>
      <h2 className="text-lg">{userName}</h2>
      <p>{userRole}</p>
    </div>
    <div
      className={`member_ready rounded-lg ${
        ready === "estimated" ? "opacity-100" : "opacity-50"
      }`}
    >
      <h2 className="text-center text-white tracking-wider">READY</h2>
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
  }));

  return (
    <section className="flex flex-col mt-6 items-center">
      <h2>Team</h2>
      <div className="grid grid-cols-1 gap-4 mt-4 justify-items-center items-center members_list rounded-2xl overflow-y-auto max-h-[90vh] w-[25vw]">
        {users.map((user, index) => (
          <MemberCard
            key={index}
            userName={user.name}
            userRole={user.role}
            ready={user.ready}
          />
        ))}
      </div>
    </section>
  );
};

export default MembersList;
