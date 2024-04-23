import CustomBtn from "./CustomBtn";

interface FigureDisplayProps {
  figure: string;
}

const FigureDisplay = ({ figure }: FigureDisplayProps) => {
  return <h3>{figure}</h3>;
};

const ResultDisplay = () => {
  return (
    <main>
      <FigureDisplay figure="8" />
      <FigureDisplay figure="3" />
      <CustomBtn type="button" text="Try again!" />
    </main>
  );
};

export default ResultDisplay;
