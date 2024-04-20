import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

const shape =  [
  {
    aiEstimate: "2",
    aiDescription:
      "Integrating an AI API into an application involves understanding the API's documentation, handling authentication, managing requests and responses, and possibly implementing client-side logic to interact with the API.",
  },
];


export const runtime = "edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(config);

export async function POST(request: Request) {
  const { messages } = await request.json();

  console.log(messages);
try {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      {
        role: "system",
        content:
          "Based on the provided task description, please estimate the effort required to complete this task using the Scrum poker technique. Consider factors such as the complexity of implementation, dependencies, and potential risks. Return an estimated number for the Fibonacci sequence between 0 and 89 and then short description why. Format the response as JSON and make it in the shape of: ${shape}"
      },
      ...messages,
    ],
  });

  console.log(completion.data.choices[0].messages)
}
} catch (error: any) {
  console.error(error)
};
)}
