interface RoomTitleProps {
  memberName: string;
  memberRole: "admin" | "guest";
  roomName: string;
  roomId?: string;
}

const RoomTitle = ({
  memberName,
  memberRole,
  roomName,
  roomId,
}: RoomTitleProps) => {
  return (
    <section className="flex flex-col gap-4 p-4 items-center justify-start min-h-full btn_component_blue text-white">
      <h2>Hi {memberName}!</h2>
      <p>Today you are the {memberRole}!</p>
      <h2>You are in the {roomName} Room </h2>
      <h2>ID to invite other guests</h2>
      <p>{roomId}!</p>
      <button type="button">Leave room</button>
    </section>
  );
};

export default RoomTitle;
