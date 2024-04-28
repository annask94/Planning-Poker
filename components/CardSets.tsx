"use client";
import React, { useState } from "react";

const cardSetOne = [
  { id: "c1", figure: "0" },
  { id: "c2", figure: "1" },
  { id: "c3", figure: "2" },
  { id: "c4", figure: "3" },
  { id: "c5", figure: "5" },
  { id: "c6", figure: "8" },
  { id: "c7", figure: "13" },
  { id: "c8", figure: "21" },
  { id: "c9", figure: "34" },
  { id: "c10", figure: "55" },
  { id: "c11", figure: "89" },
  { id: "c12", figure: "?" },
];

export interface CardData {
  id: string;
  figure: number | string;
}

interface CardProps {
  card: CardData;
  onChange: (card: CardData) => void;
  checked: boolean;
}

const Card = ({ card, onChange, checked }: CardProps) => (
  <label
    className={`card_button font-bold ${checked ? "card_picked" : ""}`}
    htmlFor={card.id}
  >
    <input
      type="radio"
      name="cardSelection"
      id={card.id}
      value={card.figure.toString()}
      checked={checked}
      onChange={() => onChange(card)}
      style={{ display: "none" }}
    />
    {card.figure}
  </label>
);

const CardSet: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);

  const handleCardSelect = (card: CardData) => {
    setSelectedCard(card);
  };

  return (
    <fieldset className="flex gap-4 justify-center items-center flex-wrap">
      {cardSetOne.map((card) => (
        <Card
          key={card.id}
          card={card}
          onChange={handleCardSelect}
          checked={selectedCard?.id === card.id}
        />
      ))}
    </fieldset>
  );
};

export default CardSet;
