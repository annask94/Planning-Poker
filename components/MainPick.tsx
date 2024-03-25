"use client";
import { useState } from "react";
import { useChat } from "ai/react";
import CardSet, { CardData } from "./CardSets";
import CustomBtn from "./CustomBtn";

function Popup({
  card,
  cardAI,
  showDetails,
  onClose,
}: {
  card: CardData;
  cardAI: string;
  showDetails: () => void;
  onClose: () => void;
}) {
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
        <CustomBtn text="Try again!" onClick={onClose} />
      </div>
    </div>
  );
}

export default function MainPick() {
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  // const [taskDescription, setTaskDescription] = useState("");
  // const [aiEstimate, setAiEstimate] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleEstimateClick = () => {
    if (selectedCard) {
      console.log(selectedCard);
      setShowPopup(true);
    } else {
      console.error("No card selected");
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setSelectedCard(null);
    setTaskDescription("");
    setAiEstimate("");
  };

  const { input, handleInputChange, handleSubmit, messages } = useChat();
  console.log(input);
  console.log(messages);
  return (
    <form
      className="flex flex-col gap-8 justify-center items-center"
      onSubmit={handleSubmit}
    >
      <label className="text-xl md:text-4xl" htmlFor="taskDescription">
        Describe the task
      </label>
      <textarea
        className="task_description rounded-md border-2 border-gray-300 outline-0"
        id="taskDescription"
        name="taskDescription"
        rows={5}
        cols={50}
        value={input}
        onChange={handleInputChange}
      />
      <h2 className="text-xl md:text-4xl">Pick a card</h2>
      <CardSet onCardSelect={setSelectedCard} selectedCard={selectedCard} />

      <button
        className="btn_component text-xl md:text-2xl px-14 py-1 rounded-md font-medium text-white hover:opacity-70"
        type="submit"
      >
        Estimate
      </button>
      {showPopup && selectedCard && (
        <Popup
          card={selectedCard}
          cardAI={aiEstimate}
          onClose={handlePopupClose}
          showDetails={handleShowDetails}
        />
      )}
    </form>
  );
}
