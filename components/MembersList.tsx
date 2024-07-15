"use client";
import React, { useEffect, useState } from "react";
import { User } from "@prisma/client";

interface MemberCardProps {
  userName: string;
  userRole: string;
}
const MemberCard = ({ userName, userRole }: MemberCardProps) => (
  <div className="bg-white p-4 member_card self-center rounded-2xl">
    <h2 className="text-lg">{userName}</h2>
    <p>{userRole}</p>
  </div>
);

interface MemberListProps {
  users: User[];
}

const MembersList = ({ users }: MemberListProps) => {
  const usersData = users.map((user) => ({
    userName: user.name,
    userRole: user.role,
  }));

  return (
    <section className="flex flex-col mt-6 items-center">
      <h2>Team</h2>
      <div className="grid grid-cols-1 gap-4 mt-6 justify-items-center items-center members_list rounded-2xl overflow-y-auto max-h-[90vh] w-[25vw]">
        {users.map((user, index) => (
          <MemberCard key={index} userName={user.name} userRole={user.role} />
        ))}
      </div>
    </section>
  );
};

export default MembersList;
