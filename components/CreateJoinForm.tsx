interface CustomBtnBlueProps {
  text: string;
  type: "button" | "submit" | "reset";
  onClick?: () => void;
}

export const CustomBtnBlue = ({ text, type, onClick }: CustomBtnBlueProps) => {
  return (
    <button
      className="btn_component_blue text-s md:text-m px-4 py-1 rounded-md font-medium text-white hover:opacity-70"
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

interface LabelInputProps {
  labelText: string;
  id: string;
  placeholderInput: string;
  nameInput: string;
}

export const LabelInput = ({
  labelText,
  id,
  placeholderInput,
  nameInput,
}: LabelInputProps) => {
  return (
    <>
      <label htmlFor={id} className="text-s md:text-m">
        {labelText}
      </label>
      <input
        type="text"
        id={id}
        name={nameInput}
        placeholder={placeholderInput}
        className="rounded-md border-2 border-gray-300 outline-none p-2 mb-4"
      />
    </>
  );
};
