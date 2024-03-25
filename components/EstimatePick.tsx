"use client";
import { useState } from "react";
import { useChat } from "ai/react";
import CardSet, { CardData } from "./CardSets";

export default function EstimatePick() {
  const { input, handleInputChange, handleSubmit } = useChat();
  console.log(input);
  return (
    <form
      className="flex flex-col gap-8 justify-center items-center"
      onSubmit={handleSubmit}
    >
      <p className="text-xl md:text-4xl">Describe the task</p>
      <textarea
        className="task_description rounded-md border-2 border-gray-300 outline-0"
        id="taskDescription"
        name="taskDescription"
        rows={5}
        cols={50}
        value={input}
        onChange={handleInputChange}
      />
      <button type="submit">Estimate</button>
    </form>
  );
}
