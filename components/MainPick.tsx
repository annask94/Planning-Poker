import React, { useState } from "react";
import OpenAI from "openai";
import CardSet, { CardData } from "./CardSets";
import CustomBtn from "./CustomBtn";

interface PopupProps {
  card: CardData;
  cardAI: string;
  showDetails: () => void;
  onClose: () => void;
  aiExplanation: string;
}

function Popup({
  card,
  cardAI,
  showDetails,
  onClose,
  aiExplanation,
}: PopupProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50 backdrop-blur-md">
      <div className="popup bg-white p-5 rounded shadow-lg flex flex-col items-center">
        <h2 className="text-2xl mb-4">Picked Card</h2>
        <div className="estimation_description grid grid-cols-2 mb-4 gap-4">
          <h3 className="text-center">Your choice</h3>
          <h3 className="text-center">AI estimate</h3>
          <p className="text-center">{card.figure}</p>
          <p className="text-center">{cardAI}</p>
        </div>
        <button type="button" onClick={showDetails}>
          Show details
        </button>
        <CustomBtn type="button" text="Try again!" onClick={onClose} />
      </div>
    </div>
  );
}

export default async function MainPick() {
  const handlePrompt = async (formData: FormData) => {
    "use server";

    const prompt = formData.get("prompt");
    const pickedCard = formData.get("cardSelection");
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

    console.log(completion.choices[0].message.content);
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
