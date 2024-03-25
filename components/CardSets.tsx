"use client";
const cardSetOne = [
  { id: "c1", figure: 0 },
  { id: "c2", figure: 1 },
  { id: "c3", figure: 2 },
  { id: "c4", figure: 3 },
  { id: "c5", figure: 5 },
  { id: "c6", figure: 8 },
  { id: "c7", figure: 13 },
  { id: "c8", figure: 21 },
  { id: "c9", figure: 34 },
  { id: "c10", figure: 55 },
  { id: "c11", figure: 89 },
  { id: "c12", figure: "?" },
];
export interface CardData {
  id: string;
  figure: number | string;
}

interface CardProps extends CardData {
  onClick: () => void;
  picked: boolean;
}
function Card({ id, figure, onClick, picked }: CardProps) {
  return (
    <button
      className={`card_button font-bold ${picked ? "card_picked" : ""}`}
      type="button"
      id={id}
      onClick={onClick}
    >
      {figure}
    </button>
  );
}

interface CardSetProps {
  onCardSelect: (card: CardData) => void;
  selectedCard: CardData | null;
}

function CardSet({ onCardSelect, selectedCard }: CardSetProps) {
  const handleCardClick = (card: CardData) => {
    onCardSelect(card);
  };
  return (
    <div className="flex gap-4 justify-center items-center flex-wrap">
      {cardSetOne.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          figure={card.figure}
          onClick={() => handleCardClick(card)}
          picked={selectedCard?.id === card.id}
        />
      ))}
    </div>
  );
}

export default CardSet;
