interface AIEstimateShareProps {
  projectDescription: string;
  taskDescription: string;
  aiCard: string;
  aiDescription: string;
}

const AIEstimateShare = ({
  projectDescription,
  taskDescription,
  aiCard,
  aiDescription,
}: AIEstimateShareProps) => {
  return (
    <div className="flex flex-col gap-4 p-4 justify-center items-center text-center">
      <h2>Project</h2>
      <p>{projectDescription}</p>
      <h2>Estimated task</h2>
      <p>{taskDescription}</p>
      <h2>AI picked</h2>
      <p className="card_button font-bold">{aiCard}</p>
      <h2>Details</h2>
      <p>{aiDescription}</p>
    </div>
  );
};

export default AIEstimateShare;
