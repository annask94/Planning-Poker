"use client";
import React, { useState } from "react";

const guestsList: MemberData[] = [
  { id: 1, name: "Michael", role: "admin" },
  { id: 2, name: "Nancy", role: "guest" },
  { id: 3, name: "Shawn", role: "guest" },
  { id: 4, name: "Chad", role: "guest" },
  { id: 5, name: "Lilly", role: "guest" },
  { id: 6, name: "Anna", role: "guest" },
  { id: 6, name: "Anna", role: "guest" },
  { id: 6, name: "Anna", role: "guest" },
  { id: 6, name: "Anna", role: "guest" },
];

export interface MemberData {
  id: number;
  name: string;
  role: "admin" | "guest";
}

interface MemberCardProps {
  member: MemberData;
}

const MemberCard = ({ member }: MemberCardProps) => (
  <div className="bg-white p-4 member_card self-center rounded-2xl">
    <h2 className="text-lg">{member.name}</h2>
    <p>{member.role}</p>
  </div>
);

const MembersList: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-4 justify-items-center items-center members_list rounded-2xl overflow-y-auto max-h-[80vh]">
      {guestsList.map((member) => (
        <MemberCard key={member.id} member={member} />
      ))}
    </div>
  );
};

export default MembersList;
