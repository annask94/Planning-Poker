import MembersList, { MemberData } from "@/components/MembersList";
import CardSet from "@/components/CardSets";
import CustomBtn from "@/components/CustomBtn";
import RoomTitle from "@/components/RoomTitle";

interface AdminInterfaceProps {
  roomId: string;
  nameAdmin: string | null;
  members: MemberData[];
}

const AdminInterface = ({
  roomId,
  nameAdmin,
  members,
}: AdminInterfaceProps) => {
  return (
    <>
      <section className="roomBoard grid grid-cols-1fr-2fr-1fr m-4 items-start justify-items-center">
        <RoomTitle
          memberName={nameAdmin || "Admin"}
          memberRole="admin"
          roomName={roomId}
        />
        <form className="flex flex-col md:gap-8 gap-4 justify-center items-center">
          <label htmlFor="projectkDescription" className="text-l md:text-2xl">
            Project description
          </label>
          <textarea
            id="projectDescription"
            name="projectDesc"
            cols={30}
            placeholder="Brief description of the project for better task complexity estimation. Use max 80 words."
            className="task_description rounded-md border-2 border-gray-300 outline-none p-2
                  md:w-[40vw] h-[40vh] md:h-[20vh]"
          />
          <label htmlFor="taskDescription" className="text-l md:text-2xl">
            Describe the task
          </label>
          <textarea
            id="taskDescription"
            name="prompt"
            cols={30}
            placeholder="Use max 150 words. Be clear and specific, include key details, describe goals and challenges, use actionable language, and provide context if needed..."
            className="task_description rounded-md border-2 border-gray-300 outline-none p-2
                  md:w-[40vw] h-[40vh] md:h-[20vh]"
          />
          <CustomBtn type="button" text="Share" />
          <CardSet cardClassName="smaller_card" />
          <CustomBtn type="submit" text="Estimate" />
        </form>
        <MembersList />
      </section>
    </>
  );
};

export default AdminInterface;
