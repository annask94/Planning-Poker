"use client";

import React, { useState } from "react";
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

export default function MainPick() {
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [taskDescription, setTaskDescription] = useState("");
  const [aiEstimate, setAiEstimate] = useState("");
  const [aiExplanation, setAiExplanation] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch(
      `/api/completion?prompt=${encodeURIComponent(taskDescription)}`
    );
    const data = await response.json();
    setAiEstimate(data.aiEstimate);
    setAiExplanation(data.aiExplanation);
    setShowPopup(true);
  };

  return (
    <form
      className="flex flex-col gap-8 justify-center items-center"
      onSubmit={handleSubmit}
    >
      <label htmlFor="taskDescription" className="text-xl md:text-4xl">
        Describe the task
      </label>
      <textarea
        id="taskDescription"
        name="taskDescription"
        rows={5}
        cols={50}
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        className="task_description rounded-md border-2 border-gray-300 outline-none"
      />
      <h2 className="text-xl md:text-4xl">Pick a card</h2>
      <CardSet onCardSelect={setSelectedCard} selectedCard={selectedCard} />
      <button
        type="submit"
        className="btn_component text-xl md:text-2xl px-14 py-1 rounded-md font-medium text-white hover:opacity-70"
      >
        Estimate
      </button>
      {showPopup && (
        <Popup
          card={selectedCard!}
          cardAI={aiEstimate}
          showDetails={() => alert(aiExplanation)}
          onClose={() => setShowPopup(false)}
          aiExplanation={aiExplanation}
        />
      )}
    </form>
  );
}
