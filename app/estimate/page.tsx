import { handlePrompt } from "./actions";
import CardSet from "@/components/CardSets";

export default function Home() {
  return (
    <form
      className="flex flex-col gap-8 justify-center items-center"
      action={handlePrompt}
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
      <button
        type="submit"
        className="btn_component text-xl md:text-2xl px-14 py-1 rounded-md font-medium text-white hover:opacity-70"
      >
        Estimate
      </button>

      <p></p>
    </form>
  );
}
