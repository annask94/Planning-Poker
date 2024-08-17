import CardSet from "./CardSets";
import CustomBtn from "./CustomBtn";
import { CardData } from "./CardSets";

interface ShareDescriptionProps {
  projectDescription?: string;
  taskDescription?: string;
  handleEstimate: () => void;
  onCardSelect: (card: CardData) => void;
  disabled: boolean;
}

const ShareDescription = ({
  projectDescription,
  taskDescription,
  handleEstimate,
  onCardSelect,
  disabled,
}: ShareDescriptionProps) => {
  return (
    <div className="flex flex-col md:gap-6 gap-2 mt-4 mb-4 justify-center items-center h-full text-center">
      <h2>Project description</h2>
      <p className="px-4">{projectDescription}</p>
      <h2>Task description</h2>
      <p className="px-4">{taskDescription}</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleEstimate();
        }}
        className="flex flex-col md:gap-6 gap-2 mt-4 mb-4"
      >
        <CardSet onCardSelect={onCardSelect} />
        <CustomBtn
          text="Estimate"
          type="submit"
          className="btn_max_width self-center"
          disabled={disabled}
        />
      </form>
    </div>
  );
};

export default ShareDescription;
