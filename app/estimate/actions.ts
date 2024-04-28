"use server";
import OpenAI from "openai";
import { redirect } from "next/navigation";

type FormState = {
  userCard: string;
  aiCard: string;
  aiDescription: string;
};

export async function handlePrompt(prevState: FormState, formData: FormData) {
  const prompt = formData.get("prompt");
  const pickedCard = formData.get("cardSelection") || "";

  console.log(prompt);
  console.log(pickedCard);
  console.log(typeof pickedCard);

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
  });

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    max_tokens: 150,
    temperature: 0.5,
    stream: false,
    messages: [
      {
        role: "user",
        content: `Based on the provided task description '${prompt}', please estimate the effort required using the Scrum poker technique. Consider factors such as the complexity of implementation, dependencies, and potential risks. Return an estimate as a JSON in a structured format: { "aiEstimate": "5", "aiDescription": "Detailed explanation here..." }`,
      },
    ],
  });

  if (completion.choices.length > 0 && completion.choices[0].message.content) {
    const aiResponseData = JSON.parse(completion.choices[0].message.content);
    console.log(aiResponseData);
    return {
      userCard: JSON.stringify(pickedCard),
      aiCard: aiResponseData.aiEstimate,
      aiDescription: aiResponseData.aiDescription,
    };
  } else {
    alert("Sorry, something went wrong. Please try again");
    return null;
  }
}
