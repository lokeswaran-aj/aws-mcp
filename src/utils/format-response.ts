import { HandlerReturnType } from "@/types/common";

export const formatResponse = (response: unknown): HandlerReturnType => ({
  content: [
    {
      type: "text" as const,
      text: JSON.stringify(response, null, 2),
    },
  ],
});
