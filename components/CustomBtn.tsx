interface CustomBtnProps {
  text: string;
  type: "button" | "submit" | "reset";
  onClick?: () => void;
}

const CustomBtn = ({ text, type, onClick }: CustomBtnProps) => {
  return (
    <button
      className="btn_component text-xl md:text-2xl px-14 py-1 rounded-md font-medium text-white hover:opacity-70"
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default CustomBtn;
