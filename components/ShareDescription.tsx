import CardSet from "./CardSets";
import CustomBtn from "./CustomBtn";

interface ShareDescriptionProps {
  projectDescription?: string;
  taskDescription?: string;
}

const ShareDescription = ({
  projectDescription,
  taskDescription,
}: ShareDescriptionProps) => {
  return (
    <div className="flex flex-col md:gap-6 gap-2 mt-4 mb-4 justify-start items-center h-full text-center">
      <h2>Project description</h2>
      <p className="px-4">{projectDescription}</p>
      <h2>Task description</h2>
      <p className="px-4">{taskDescription}</p>
      <form className="flex flex-col md:gap-6 gap-2 mt-4 mb-4">
        <CardSet />
        <CustomBtn text="Estimate" type="submit" />
      </form>
    </div>
  );
};

export default ShareDescription;
