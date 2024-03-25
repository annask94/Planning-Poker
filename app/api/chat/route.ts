import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = "edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(config);

export async function POST(request: Request) {
  const { messages } = await request.json();

  console.log(messages);

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "Based on the provided task description, please estimate the effort required to complete this task using the Scrum poker technique. Consider factors such as the complexity of implementation, dependencies, and potential risks. Return only an estimated number for the Fibonacci sequence between 0 and 89, withouth additional description",
      },
      ...messages,
    ],
  });

  const stream = await OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
