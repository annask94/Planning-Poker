"use client";
import { useState } from "react";
import CardSet, { CardData } from "./CardSets";
import CustomBtn from "./CustomBtn";

function Popup({ card, onClose }: { card: CardData; onClose: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50 backdrop-blur-md">
      <div className="popup bg-white p-5 rounded shadow-lg flex flex-col items-center">
        <h2 className="text-2xl mb-4">Picked Card</h2>
        <div className="estimation_description grid grid-cols-2 mb-4 gap-4">
          <h3 className="text-center">Your choice</h3>
          <h3 className="text-center">AI estimate</h3>
          <p className="text-center">{card.figure}</p>
          <p className="text-center">ex21</p>
        </div>
        <CustomBtn text="Try again!" onClick={onClose} />
      </div>
    </div>
  );
}

const MainPick = () => {
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
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
  };
  return (
    <form className="flex flex-col gap-8 justify-center items-center">
      <label className="text-xl md:text-4xl" htmlFor="taskDescription">
        Describe the task
      </label>
      <textarea
        className="task_description rounded-md border-2 border-gray-300 outline-0"
        id="taskDescription"
        name="taskDescription"
        rows={5}
        cols={50}
      />
      <h2 className="text-xl md:text-4xl">Pick a card</h2>
      <CardSet onCardSelect={setSelectedCard} selectedCard={selectedCard} />
      <CustomBtn text="Estimate" onClick={handleEstimateClick} />
      {showPopup && selectedCard && (
        <Popup card={selectedCard} onClose={handlePopupClose} />
      )}
    </form>
  );
};

export default MainPick;
