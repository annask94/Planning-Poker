"use client";
import { useState, useEffect, useRef } from "react";
import { Toaster, toast } from "sonner";
import "react-toastify/dist/ReactToastify.css";
import MembersList from "@/components/MembersList";
import CustomBtn from "@/components/CustomBtn";
import ShareDescription from "./ShareDescription";
import AIEstimateShare from "./AIEstimateShare";
import { User } from "@prisma/client";
import { CardData } from "./CardSets";
import { APIKeyEnter } from "./APIKeyPopUp";

interface AdminInterfaceProps {
  roomId: string;
  userId: string | null;
  roomName: string;
  nameAdmin: string | null;
  users: User[];
  socket: any;
  projectData: {
    projectDescription: string;
    taskDescription: string;
    taskId: string;
  } | null;
}

interface AiSharedEstimate {
  aiCard: string;
  aiDescription: string;
}

const AdminInterface = ({
  roomId,
  userId,
  roomName,
  nameAdmin,
  users,
  socket,
  projectData,
}: AdminInterfaceProps) => {
  const [projectDescription, setProjectDescription] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [sharedProjectDescription, setSharedProjectDescription] = useState("");
  const [sharedTaskDescription, setSharedTaskDescription] = useState("");
  const [isShared, setIsShared] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [isClipboardSupported, setIsClipboardSupported] = useState(true);
  const [showKeyPopup, setShowKeyPopup] = useState(false);
  const [aiIsShared, setAiIsShared] = useState(false);
  const [aiEstimateCard, setAiEstimateCard] = useState("");
  const [aiEstimateDescription, setAiEstimateDescription] = useState("");
  const [isEstimateButtonDisabled, setEstimateButtonDisabled] = useState(false);

  const sharedTaskId = useRef<string | null>(null);

  const hideAPIKeyPopUp = () => {
    setShowKeyPopup(false);
  };

  const handleAPIEntry = (apiKey: string, aiModel: string) => {
    console.log("Received API Key:", apiKey);
    console.log("Selected AI Model:", aiModel);
  };

  interface SharedDescription {
    projectDescription: string;
    taskDescription: string;
    taskId: string;
  }

  useEffect(() => {
    setIsClipboardSupported(!!navigator.clipboard);
  }, []);

  const copyToClipboard = async (roomId: string) => {
    if (!navigator.clipboard) {
      toast.error("Clipboard API not available");
      setIsClipboardSupported(false);
      return;
    }
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room ID copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy!");
      console.error("Failed to copy!", err);
    }
  };

  useEffect(() => {
    if (projectData) {
      setSharedProjectDescription(projectData.projectDescription);
      setSharedTaskDescription(projectData.taskDescription);
      sharedTaskId.current = projectData.taskId;
      setIsShared(true);
    }

    socket.on(
      "project-shared",
      ({ projectDescription, taskDescription, taskId }: SharedDescription) => {
        +console.log(
          "Received project-shared event:",
          projectDescription,
          taskDescription,
          taskId
        );
        setSharedProjectDescription(projectDescription);
        setSharedTaskDescription(taskDescription);
        sharedTaskId.current = taskId;
        setIsShared(true);
      }
    );

    socket.on(
      "aiEstimate-received",
      ({ aiCard, aiDescription }: AiSharedEstimate) => {
        setAiEstimateCard(aiCard);
        setAiEstimateDescription(aiDescription);
        setAiIsShared(true);
      }
    );

    return () => {
      socket.off("project-shared");
      socket.off("aiEstimate-received");
    };
  }, [socket, projectData]);

  const handleShare = () => {
    console.log("Emitting share-project event:", {
      roomId,
      projectDescription,
      taskDescription,
    });
    socket.emit("share-project", {
      roomId,
      projectDescription,
      taskDescription,
    });
    setIsShared(true);
  };

  const handleEstimate = () => {
    if (selectedCard) {
      console.log("Emitting estimate event:", {
        roomId,
        pickedCard: selectedCard.figure,
        taskId: projectData?.taskId || sharedTaskId.current,
        userId,
      });
      socket.emit("estimate", {
        roomId,
        pickedCard: selectedCard.figure,
        taskId: projectData?.taskId || sharedTaskId.current,
        userId,
      });
      setEstimateButtonDisabled(true);
    } else {
      console.error("No card selected");
    }
  };

  const aiEstimate = () => {
    console.log("Emitting aiEstimate event:", {
      roomId,
      taskId: projectData?.taskId || sharedTaskId.current,
      taskDescription,
      projectDescription,
    });
    socket.emit("aiEstimate", {
      roomId,
      taskId: projectData?.taskId || sharedTaskId.current,
      taskDescription,
      projectDescription,
    });
  };

  return (
    <>
      <section className="roomBoard grid grid-cols-1fr-5fr-3fr items-start justify-items-stretch h-full min-h-screen">
        <section className="flex flex-col gap-6 p-4 justify-start min-h-full btn_component_blue text-white">
          <div className="grid grid-cols-1 gap-1 mb-10 text-center">
            <h2>Hi {nameAdmin}!</h2>
            <p>Today you are the Admin!</p>
            <p>You are in the {roomName} Room </p>
          </div>
          <div className="grid grid-cols-1 gap-6 text-sm">
            <button
              className="menu_btn"
              type="button"
              onClick={() => copyToClipboard(roomId)}
            >
              Copy the room ID
            </button>
            {!isClipboardSupported && <p>{roomId}</p>}
            <button className="menu_btn" onClick={() => setShowKeyPopup(true)}>
              Enter OpenAI API key
            </button>
            <button className="menu_btn" type="button">
              Leave room
            </button>
          </div>
        </section>

        <section className="p-8 m-4">
          <p className="text-center italic text-sm">
            Enter descriptions for projects and tasks, and share these with your
            team for collaborative Scrum poker estimations.
            <br /> Utilize the &#39;Ask AI&#39; feature to obtain AI-driven
            effort estimations, which consider various project complexities and
            risks.
            <br /> You can customize AI responses by using your own API key and
            choosing from different OpenAI models.
            <br /> This setup aims to enhance estimation accuracy and streamline
            project planning.
          </p>
          {aiIsShared ? (
            <div>
              <AIEstimateShare
                projectDescription={
                  projectData?.projectDescription || sharedProjectDescription
                }
                taskDescription={
                  projectData?.taskDescription || sharedTaskDescription
                }
                aiCard={aiEstimateCard}
                aiDescription={aiEstimateDescription}
              />
              <div className="flex justify-between mt-8 mb-4">
                <CustomBtn text="New Task" type="button" />
                <CustomBtn text="New Project" type="button" />
                <CustomBtn text="Close room" type="button" />
              </div>
            </div>
          ) : isShared ? (
            <div className="grid grid-cols-1 justify-items-center">
              <ShareDescription
                projectDescription={sharedProjectDescription}
                taskDescription={sharedTaskDescription}
                handleEstimate={handleEstimate}
                onCardSelect={setSelectedCard}
                disabled={isEstimateButtonDisabled}
              />
              <button
                type="button"
                className="mt-6 mb-6 text-2xl md:text-3xl font-bold ai_estimate_btn rounded-md p-3"
                onClick={aiEstimate}
              >
                Ask AI
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleShare();
              }}
              className="flex flex-col md:gap-6 gap-2 mt-4 mb-4 justify-center items-center"
            >
              <label
                htmlFor="projectDescription"
                className="text-l md:text-2xl"
              >
                Project description
              </label>
              <textarea
                id="projectDescription"
                name="projectDesc"
                cols={30}
                placeholder="Brief description of the project for better task complexity estimation. Use max 450 characters."
                className="task_description rounded-md border-2 border-gray-300 outline-none p-2
                  md:w-[40vw] h-[40vh] md:h-[20vh]"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
              />
              <label htmlFor="taskDescription" className="text-l md:text-2xl">
                Describe the task
              </label>
              <textarea
                id="taskDescription"
                name="prompt"
                cols={30}
                placeholder="Use max 300 characters. Be clear and specific, include key details, describe goals and challenges, use actionable language, and provide context if needed..."
                className="task_description rounded-md border-2 border-gray-300 outline-none p-2
                  md:w-[40vw] h-[40vh] md:h-[20vh]"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
              <CustomBtn type="submit" text="Share" />
            </form>
          )}
        </section>
        <MembersList users={users} />
      </section>
      {showKeyPopup && (
        <APIKeyEnter
          closePopUp={hideAPIKeyPopUp}
          handleAPIEntry={handleAPIEntry}
        />
      )}
    </>
  );
};

export default AdminInterface;
