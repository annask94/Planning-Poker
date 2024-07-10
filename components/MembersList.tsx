"use client";
import React from "react";

const guestsList: MemberData[] = [
  { id: 1, name: "Michael", role: "admin" },
  { id: 2, name: "Nancy", role: "guest" },
  { id: 3, name: "Shawn", role: "guest" },
];

export interface MemberData {
  userId: number;
  userName: string;
  role: string;
}

interface MemberCardProps {
  member: MemberData;
}

const MemberCard = ({ member }: MemberCardProps) => (
  <div className="bg-white p-4 member_card self-center rounded-2xl">
    <h2 className="text-lg">{member.userName}</h2>
    <p>{member.role}</p>
  </div>
);

const MembersList: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-4 justify-items-center items-center members_list rounded-2xl overflow-y-auto max-h-[90vh] w-[25vw]">
      {guestsList.map((member) => (
        <MemberCard key={member.id} member={member} />
      ))}
    </div>
  );
};

export default MembersList;
