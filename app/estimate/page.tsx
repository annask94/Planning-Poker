"use client";
import React, { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { handlePrompt } from "./actions";
import { formDataSchema } from "./schemas";
import CardSet from "@/components/CardSets";
import SubmitBtn from "@/components/SubmitBtn";

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [errors, setErrors] = useState({ prompt: "", cardSelection: "" });

  const [state, action] = useFormState(handlePrompt, {
    userCard: "",
    aiCard: "",
    aiDescription: "",
    message: "",
  });

  useEffect(() => {
    if (state?.aiCard && state?.aiDescription) {
      setShowPopup(true);
    } else if (state?.message) {
      setShowPopup(true);
    }
  }, [state?.aiCard, state?.aiDescription, state?.message]);

  return (
    <>
      <form
        className="flex flex-col md:gap-8 gap-4 justify-center items-center mx-3"
        action={async (formData: FormData) => {
          const validation = formDataSchema.safeParse({
            prompt: formData.get("prompt"),
            cardSelection: formData.get("cardSelection"),
          });

          if (!validation.success) {
            const fieldErrors = validation.error.flatten().fieldErrors;
            setErrors({
              prompt: fieldErrors.prompt?.[0] || "",
              cardSelection: fieldErrors.cardSelection?.[0] || "",
            });
            console.error("Validation failed:", validation.error);
            return;
          }

          setErrors({ prompt: "", cardSelection: "" });
          await action(formData);
        }}
      >
        <label htmlFor="taskDescription" className="text-xl md:text-4xl">
          Describe the task
        </label>
        <textarea
          id="taskDescription"
          name="prompt"
          rows={5}
          cols={50}
          placeholder="Use max 150 words. Be clear and specific, include key details, describe goals and challenges, use actionable language, and provide context if needed..."
          className="task_description rounded-md border-2 border-gray-300 outline-none p-2
             w-full md:w-[80vw] h-[40vh] md:h-[30vh]"
        />
        {errors.prompt && (
          <p className="text-red-500 text-sm">{errors.prompt}</p>
        )}
        <h2 className="text-xl md:text-4xl">Pick a card</h2>
        <CardSet />
        {errors.cardSelection && (
          <p className="text-red-500 text-sm">{errors.cardSelection}</p>
        )}
        <SubmitBtn />
      </form>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-lg z-50 flex justify-center items-center pt-10">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl flex flex-col justify-center items-center gap-4">
            {state?.message ? (
              <>
                <p className="font-semibold">{state.message}</p>
                <button
                  onClick={() => {
                    window.location.reload();
                  }}
                  className="btn_component text-l md:text-xl px-14 py-1 rounded-md font-medium text-white hover:opacity-70"
                >
                  Try Again
                </button>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold">AI Estimate</h2>
                <p className="font-semibold">Your Card {state?.userCard}</p>
                <p className="font-semibold">AI Card {state?.aiCard}</p>
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-sm underline hover:opacity-70"
                >
                  {showDetails ? "Hide Details" : "Show Details"}
                </button>
                {showDetails && (
                  <p className="text-justify"> {state?.aiDescription}</p>
                )}

                <button
                  onClick={() => {
                    window.location.reload();
                  }}
                  className="btn_component text-l md:text-xl px-14 py-1 rounded-md font-medium text-white hover:opacity-70"
                >
                  Estimate again!
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
