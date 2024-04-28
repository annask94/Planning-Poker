"use client";
import { useFormState } from "react-dom";
import { handlePrompt } from "./actions";
import CardSet from "@/components/CardSets";
import SubmitBtn from "@/components/submitBtn";

export default function Home() {
  const [state, action] = useFormState(handlePrompt, {
    userCard: "",
    aiCard: "",
    aiDescription: "",
  });
  return (
    <form
      className="flex flex-col gap-8 justify-center items-center"
      action={action}
    >
      <label htmlFor="taskDescription" className="text-xl md:text-4xl">
        Describe the task
      </label>
      <textarea
        id="taskDescription"
        name="prompt"
        rows={5}
        cols={50}
        className="task_description rounded-md border-2 border-gray-300 outline-none"
      />
      <h2 className="text-xl md:text-4xl">Pick a card</h2>
      <CardSet />
      <SubmitBtn />
      <p>{state.userCard}</p>
      <p>{state?.aiCard}</p>
      <p>{state?.aiDescription}</p>
    </form>
  );
}
