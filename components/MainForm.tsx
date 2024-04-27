import OpenAI from "openai";
import { handlePrompt } from "./APIHandle";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CardSet, { CardData } from "./CardSets";

export default async function MainForm() {
  const handlePrompt = async (formData: FormData) => {
    "use server";

    const prompt = formData.get("prompt");
    const pickedCard = formData.get("cardSelection") || "";

    console.log(prompt);
    console.log(pickedCard);

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      max_tokens: 150,
      temperature: 0.5,
      stream: false,
      messages: [
        {
          role: "user",
          content: `Based on the provided task description '${prompt}', please estimate the effort required using the Scrum poker technique. Consider factors such as the complexity of implementation, dependencies, and potential risks. Return an estimate as a JSON in a structured format: { "aiEstimate": "5", "aiDescription": "Detailed explanation here..." }`,
        },
      ],
    });

    if (completion.choices[0].message.content) {
      const aiResponseData = JSON.parse(completion.choices[0].message.content);
      console.log("AI Estimate:", aiResponseData.aiEstimate);
      console.log("AI Description:", aiResponseData.aiDescription);
      localStorage.setItem("aiResponse", JSON.stringify(aiResponseData));
    } else {
      console.log("No content available to parse");
    }
  };

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
