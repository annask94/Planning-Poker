import MembersList from "@/components/MembersList";
import CardSet from "@/components/CardSets";
import CustomBtn from "@/components/CustomBtn";
import { User } from "@prisma/client";

interface AdminInterfaceProps {
  roomId: string;
  roomName: string;
  nameAdmin: string | null;
  users: User[];
}

const AdminInterface = ({
  roomId,
  roomName,
  nameAdmin,
  users,
}: AdminInterfaceProps) => {
  return (
    <>
      <section className="roomBoard grid grid-cols-2fr-5fr-3fr items-start justify-items-stretch">
        <section className="flex flex-col gap-6 p-4 items-center justify-start min-h-full btn_component_blue text-white text-center">
          <h2>Hi {nameAdmin}!</h2>
          <p>Today you are the Admin!</p>
          <p>You are in the {roomName} Room </p>
          <div className="border border-white">
            <p className="font-semibold">
              Copy the room ID to invite other guests
            </p>
            <p>{roomId}</p>
          </div>
          <button type="button">Leave room</button>
        </section>

        <form className="flex flex-col md:gap-6 gap-2 mt-4 mb-4 justify-center items-center">
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
        <MembersList users={users} />
      </section>
    </>
  );
};

export default AdminInterface;
