"use client";
import React, { useState } from "react";

const guestsList: MemberData[] = [
  { id: 1, name: "Michael", role: "admin" },
  { id: 2, name: "Nancy", role: "guest" },
  { id: 3, name: "Shawn", role: "guest" },
  { id: 4, name: "Chad", role: "guest" },
  { id: 5, name: "Lilly", role: "guest" },
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
  <div>
    <h2>{member.name}</h2>
    <p>{member.role}</p>
  </div>
);

const MembersList: React.FC = () => {
  return (
    <div className="flex gap-4 justify-center items-center flex-wrap">
      {guestsList.map((member) => (
        <MemberCard key={member.id} member={member} />
      ))}
    </div>
  );
};

export default MembersList;
