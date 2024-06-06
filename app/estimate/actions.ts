"use server";
import OpenAI from "openai";
import { unknown } from "zod";

type FormState = {
  userCard: string;
  aiCard: any;
  aiDescription: any;
  message: string;
};

export async function handlePrompt(
  state: FormState | null,
  formData: FormData
): Promise<FormState | null> {
  const prompt = formData.get("prompt");
  const pickedCard = (formData.get("cardSelection") as string) || "";

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
  });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      max_tokens: 150,
      temperature: 0.5,
      stream: false,
      messages: [
        {
          role: "user",
          content: `Based on the provided task description '${prompt}', please estimate the effort required using the Scrum poker technique. Consider factors such as the complexity of implementation, dependencies, and potential risks. Return an estimate as a JSON in a structured format: { "aiEstimate": "5", "aiDescription": "Explanation here..." }. Make the Explanation maximum of 50 words.`,
        },
      ],
    });

    if (
      completion.choices.length > 0 &&
      completion.choices[0].message.content
    ) {
      const aiResponseData = JSON.parse(completion.choices[0].message.content);
      return {
        userCard: pickedCard,
        aiCard: aiResponseData.aiEstimate,
        aiDescription: aiResponseData.aiDescription,
        message: "",
      };
    } else {
      console.error("No valid response from AI.");
      return {
        userCard: pickedCard,
        aiCard: null,
        aiDescription: null,
        message: "No valid response from AI.",
      };
    }
  } catch (error) {
    console.error("Error processing AI completion:", error);
    return {
      userCard: pickedCard,
      aiCard: null,
      aiDescription: null,
      message: "Error processing AI completion: ",
    };
  }
}
