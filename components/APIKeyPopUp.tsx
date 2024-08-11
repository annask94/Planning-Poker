import React from "react";
import CustomBtn from "./CustomBtn";

interface APIKeyEnterProps {
  closePopUp: () => void;
  handleAPIEntry: (apiKey: string, aiModel: string) => void;
}

export const APIKeyEnter = ({
  closePopUp,
  handleAPIEntry,
}: APIKeyEnterProps) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const apiKey = (
      event.currentTarget.elements.namedItem("apiKey") as HTMLInputElement
    ).value;
    const aiModel = (
      event.currentTarget.elements.namedItem("aiModel") as HTMLSelectElement
    ).value;
    handleAPIEntry(apiKey, aiModel);
    closePopUp();
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-lg z-50 flex justify-center items-center pt-10">
      <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-4xl gap-4 ">
        <button
          onClick={closePopUp}
          className="absolute font-bold top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          &#10005;
        </button>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-2 items-center justify-center w-full"
        >
          <label htmlFor="apiKey" className="text-center">
            OpenAI API key
          </label>
          <input
            type="text"
            id="apiKey"
            name="apiKey"
            className="rounded-md border-2 border-gray-300 outline-none p-2"
          />
          <label htmlFor="aiModel" className="text-center">
            AI model
          </label>
          <select
            name="aiModel"
            id="aiModel"
            className="mb-2 rounded-md border-2 border-gray-300 outline-none p-2"
          >
            <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
            <option value="gpt-4">gpt-4</option>
            <option value="gpt-4-turbo">gpt-4-turbo</option>
            <option value="gpt-4o">gpt-4o</option>
            <option value="gpt-4o-mini">gpt-4o-mini</option>
          </select>
          <CustomBtn type="submit" text="Enter" />
        </form>
      </div>
    </div>
  );
};
