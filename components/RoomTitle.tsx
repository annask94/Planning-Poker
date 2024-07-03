interface RoomTitleProps {
  memberName: string;
  memberRole: "admin" | "guest";
  roomName: string;
}

const RoomTitle = ({ memberName, memberRole, roomName }: RoomTitleProps) => {
  return (
    <section className="flex flex-col gap-4 m-2 bg-slate-500">
      <h2>Hi! {memberName}</h2>
      <p>{memberRole}</p>
      <h2>You are in Room {roomName} </h2>
    </section>
  );
};

export default RoomTitle;
