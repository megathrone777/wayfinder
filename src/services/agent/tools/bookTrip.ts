import { tool } from "ai";
import { z } from "zod/v4";

const bookTrip = tool({
  description: "Finalize and book the planned trip. Requires user confirmation.",

  inputSchema: z.object({
    itinerarySummary: z.string(),
    totalPrice: z.number(),
  }),

  outputSchema: z.object({
    bookedAt: z.string().optional(),
    confirmed: z.boolean(),
    itinerarySummary: z.string().optional(),
    totalPrice: z.number().optional(),
  }),
});

export { bookTrip };
