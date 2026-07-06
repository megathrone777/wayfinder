import { tool, type Tool } from "ai";
import { z } from "zod/v4";

interface TInput {
  itinerarySummary: string;
  totalPrice: number;
}

const bookTrip: Tool<TInput> = tool({
  description: "Finalize and book the planned trip. Requires user confirmation.",
  inputSchema: z.object({
    itinerarySummary: z.string(),
    totalPrice: z.number(),
  }),
});

export { bookTrip };
