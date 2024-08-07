interface CustomBtnProps {
  text: string;
  type: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
}

const CustomBtn = ({ text, type, onClick, className }: CustomBtnProps) => {
  return (
    <button
      className={`btn_component text-xl md:text-2xl px-14 py-1 rounded-md font-medium text-white hover:opacity-70 ${className}`}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default CustomBtn;
