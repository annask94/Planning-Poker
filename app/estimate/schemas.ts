import { z } from "zod";

const meaningfulText = z
  .string()
  .min(1, "Task description must be at least 1 character long.")
  .max(300, "Task description cannot exceed 300 characters.")
  .refine(
    (value) => {
      const wordPattern = /\b\w+\b/g;
      const words = value.match(wordPattern);
      return words && words.length >= 3;
    },
    {
      message: "The task description must contain at least 3 meaningful words.",
    }
  );

export const formDataSchema = z.object({
  prompt: meaningfulText,
  cardSelection: z
    .union([z.string().min(1), z.number()])
    .refine((value) => value !== "", {
      message: "You must pick a card.",
    }),
});

export const apiResponseSchema = z.object({
  userCard: z.string().min(1),
  aiCard: z.string(),
  aiDescription: z.string().min(1),
  message: z.literal(""),
});
