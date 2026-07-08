import { tool } from "ai";
import { z } from "zod/v4";

type TItineraryPoolDay = Pick<TItineraryDay, "stops" | "title"> & { id: string };

const assembleItinerary = tool({
  description:
    "Assemble a day-by-day itinerary for the destination. Returns one day plan per trip day, randomly selected from the activity pool.",

  execute: async ({ days }) => {
    const response = await fetch(`${process.env.PUBLIC_URL}/mock/itinerary.json`);
    const pool = (await response.json()) as TItineraryPoolDay[];
    const count = Math.min(Math.max(days, 1), pool.length);
    const selection = [...pool].sort((): number => Math.random() - 0.5).slice(0, count);

    return selection.map<TItineraryDay>(({ stops, title }: TItineraryPoolDay, index: number) => ({
      day: index + 1,
      stops,
      title,
    }));
  },

  inputSchema: z.object({
    city: z.string().describe("Destination city the itinerary is for"),
    days: z.number().describe("Number of days in the trip"),
  }),
});

export { assembleItinerary };
