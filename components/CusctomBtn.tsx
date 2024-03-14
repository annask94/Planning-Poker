interface CustomBtnProps {
  text: string;
  onClick: () => void;
}

const CustomBtn = ({ text, onClick }: CustomBtnProps) => {
  return (
    <button
      className="btn_component text-2xl px-14 py-1 rounded-md font-medium text-white"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default CustomBtn;
