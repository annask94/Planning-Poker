import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end("Method Not Allowed");
    return;
  }

  try {
    // Extract the `prompt` from the body of the request
    const { prompt } = await req.body;

    if (!prompt) {
      res
        .status(400)
        .json({ error: "Prompt is required in the request body." });
      return;
    }

    const completion = await openai.completions.create;
    ({
      model: "gpt-3.5-turbo",
      prompt: `Based on the provided task description '${prompt}', please estimate the effort required using the Scrum poker technique. Consider factors such as the complexity of implementation, dependencies, and potential risks. Return an estimate as a JSON in a structured format: { "aiEstimate": "5", "aiDescription": "Detailed explanation here..." }`,
      max_tokens: 150,
      temperature: 0.5,
    });

    const parsedResponse = JSON.parse(completion.choices[0].text);

    res.status(200).json({
      aiEstimate: parsedResponse.aiEstimate,
      aiDescription: parsedResponse.aiDescription,
    });
  } catch (error) {
    console.error("Error in AI response:", error);
    res.status(500).json({ error: "Failed to process the AI response" });
  }
}
