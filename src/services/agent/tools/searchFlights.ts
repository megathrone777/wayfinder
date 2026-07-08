import { tool } from "ai";
import { z } from "zod/v4";

const searchFlights = tool({
  description: "Search available flights between two cities",

  execute: async ({ cityFrom, cityTo }): Promise<TFlight[]> => {
    const response = await fetch(process.env.FLIGHTS_API_URL);
    const { data: flights } = (await response.json()) as { data: TFlight[] };

    if (response.ok && !!flights.length) {
      return flights.map<TFlight>((flight: TFlight) => ({ ...flight, cityFrom, cityTo }));
    }

    return [];
  },

  inputSchema: z.object({
    cityFrom: z.string().describe("Origin city or airport"),
    cityTo: z.string().describe("Destination city or airport"),
  }),
});

export { searchFlights };
